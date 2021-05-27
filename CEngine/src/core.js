
import {config} from './config/config.js';
import storeModule from './modules/store';
import eventModule from  './modules/event';
import InputModule from './modules/input';
import mapModule from './modules/loader/map_loader';
import sceneModule from './modules/scene';
import soundModule from './modules/sound';
import debugStatsModule from './modules/debugStats';
import {ECSModule, components, system} from './modules/ecs';
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
        this._stats = new Stats();
        this._lastTime = 0;
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

    _run(ts = 0){
        const {debug, renderer, fps} = this.store.data;
        //console.log(this.store.data)
        requestAnimationFrame(this._run.bind(this));

        if(ts - this._lastTime < 1000 / fps ) return 

        if(debug){
            this._stats.begin();
        }
        
        sceneModule.currentScene.update(ts - this._lastTime);
        sceneModule.currentScene.world._runUpdate(ts - this._lastTime);

       if(renderer.type == 'PIXI' && sceneModule.currentScene){
          renderer.render(sceneModule.currentScene.stage);
        }

        if(debug){
            this._stats.end();
        }

        this._lastTime = ts;
        eventModule.finalize(sceneModule.currentScene._name);

        debugStatsModule.renderStats();
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

function core(){
    // expose needed functionality
    return {
        engine: new GameEngine(),
        sceneTemplates: {PixiScene},
        systemTemplate: system,
        components: components.comp
    }
}


export default core();

