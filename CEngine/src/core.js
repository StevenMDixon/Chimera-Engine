
import {config} from './config/config.js';
import storeModule from './modules/store';
import eventModule from  './modules/event';
import InputModule from './modules/input';
import mapModule from './modules/loader/map_loader';
import sceneModule from './modules/scene';
import soundModule from './modules/sound';
import debugStatsModule from './modules/debugStats';
import {ECSModule} from './modules/ecs';
import Stats from 'stats.js'


import {PixiScene, PixiRenderer} from './pixi_templates/index';

class GameEngine {
    constructor(){
        // create a store for the engine to use
        this.store = storeModule.createStore('engine', config);
        this.store.set(
            {
                config: {},
                renderer: null,
                loader: null,
                debug: false,
                modules: {
                    event: eventModule,
                    input: InputModule,
                    map: mapModule,
                    world: ECSModule,
                    scene: sceneModule,
                    store: storeModule 
                }
            }
        );
        this.once = 0
        this._stats = new Stats();
        this._lastTime = 0;
        this._timestep = 1000 / 360 ;
        this._delta = 0;
        this._lastFrameTimeMs = 0;
    }

    setConfig(configObject){
        this.store.update({config: configObject});
        // create pixi renderer
        if('pixiSettings' in configObject){
            this.store.update(
                {
                    renderer: new PixiRenderer(configObject.pixiSettings),
                    loader: configObject.pixiSettings.PIXI.Loader.shared
                }
            )
            eventModule.subscribe('&controlSound', this._routePixiAudio.bind(this));
        };

        if(configObject.debug){
            this._addDebugInfo();
            this.store.update({debug: true});

            if(configObject.pixiSettings){
                debugStatsModule.setTarget(configObject.pixiSettings.options.target);
            }
            eventModule.subscribe('&updatedebug', (e) => debugStatsModule.update(e))
        }
        InputModule.enableGamePad();
        InputModule.sendTo(this._routeInputs.bind(this));
    }

    load(...assets){
        const {loader, renderer} = this.store.data;
        if(renderer.type == 'PIXI'){
            assets.forEach(item => loader.add(item.name, item.file));
            loader.load();
        }
    }

    start(){
        const {loader, config} = this.store.data;
        loader.onComplete.add(() => {
            sceneModule.createScenes(config.scenes, this.store.data);
            this._run();

        })
    }

    _run(timestamp = 0){
        const {debug, renderer, fps} = this.store.data;
        const {currentScene} = sceneModule;


        if (timestamp < this._lastFrameTimeMs + this._timestep) {
            requestAnimationFrame(this._run.bind(this));
            return;
        }

        this._delta += timestamp - this._lastFrameTimeMs;
        this._lastFrameTimeMs = timestamp;
        if(debug){
            this._stats.begin();
        }

        let numUpdates = 0;
        while (this._delta >= this._timestep) {
            currentScene.update(this._timestep);
            currentScene.world._runUpdate(this._timestep);
            eventModule.finalize(currentScene._name);
            this._delta -= this._timestep;
            if(++numUpdates > 5){
                break;
            }
        }
        //console.log(this.store.data)


        // requestAnimationFrame(this._run.bind(this));


        // if(ts - this._lastTime < (1000 / fps) ) return;

        // const dt = ((ts - this._lastTime)/100);

        
        


        // if(currentScene){
        //     
        renderer.render(sceneModule.currentScene);
        //     
        // }
    
        if(debug){
            this._stats.end();
        }

        // this._lastTime = ts;

        debugStatsModule.renderStats();
        requestAnimationFrame(this._run.bind(this));
    };

    _addDebugInfo(){
        this._stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this._stats.dom);
    }

    _routeInputs(inputs){
        eventModule.publishEventtoChild('&inputs_updated', inputs, sceneModule.currentScene._name);
    }

    _routePixiAudio(command){
        const {loader} = this.store.data;
        const audioFiles = {};
        for(const [k, property] of Object.entries(loader.resources)){
            if(property.sound){
                audioFiles[k] = property;
            }
        }
        for(const [k, property] of Object.entries(sceneModule.currentScene.loader.resources)){
            if(property.sound){
                audioFiles[k] = property;
            }
        }
        soundModule.pixiAudioControl(audioFiles, command);
    }

    loadSpriteSheet(sheet, fileName){
        if(sheet.tiledversion){
            mapModule.loadSpriteSheet(sheet, 'tiled', fileName);
        }else{
            // @todo other sheets?
        }
        return mapModule.spriteSheets;
    }

    loadMap(mapData, name){
        mapModule.loadMapFromJSON(mapData, name);
    }
}

// function core(){
//     // expose needed functionality
//     return {
//         engine: ,
//         sceneTemplates: {PixiScene},
//         systemTemplate: system,
//         components: components.comp,
//         Vector
//     }
// }




export default new GameEngine();

