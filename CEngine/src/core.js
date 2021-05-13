
import {config} from './config/config.js';
import storeFactory from './modules/store/index.js';
import eventManager from  './modules/event';
import InputManager from './modules/input';
import mapManager from './modules/map';
import sceneManager from './modules/scene';
import soundManager from './modules/sound/index.js';

import {ECSManager, components, system} from './modules/ecs';
import Stats from 'stats.js'

import {PixiScene, PixiRenderer} from './pixi_templates/index';


class GameEngine {
    constructor(){
        // create a store for the engine to use
        this.store = storeFactory.createStore('engine', config);
        this.store.set(
            {
                config: {},
                renderer: null,
                loader: null,
                debug: false,
                managers: {
                    event: eventManager,
                    input: InputManager,
                    map: mapManager,
                    world: ECSManager,
                    scene: sceneManager,
                    store: storeFactory
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
            eventManager.subscribe('_controlSound', this._routePixiAudio.bind(this));
        };

        if(configObject.debug){
            this._addDebugInfo();
            this.store.update({debug: true});
        }
        InputManager.enableGamePad();
        InputManager.sendTo(this._routeInputs.bind(this));
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
            sceneManager.createScenes(config.scenes, this.store.data);
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
        
        sceneManager.currentScene.update(ts - this._lastTime);
        sceneManager.currentScene.world._runUpdate(ts - this._lastTime);

       if(renderer.type == 'PIXI' && sceneManager.currentScene){
            renderer.render(sceneManager.currentScene.stage);
        }

        if(debug){
            this._stats.end();
        }

        this._lastTime = ts;

        eventManager.finalize(sceneManager.currentScene._name);
    };

    _addDebugInfo(){
        this._stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this._stats.dom);
    }

    _routeInputs(inputs){
        eventManager.publishEventtoChild('&inputs_updated', inputs, sceneManager.currentScene._name);
    }

    _routePixiAudio(command){
        const {loader} = this.store.data;
        const audioFiles = {};
        for(const [k, property] of Object.entries(loader.resources)){
            if(property.sound){
                audioFiles[k] = property;
            }
        }
        for(const [k, property] of Object.entries(sceneManager.currentScene.loader.resources)){
            if(property.sound){
                audioFiles[k] = property;
            }
        }
        soundManager.pixiAudioControl(audioFiles, command);
    }

    loadSpriteSheet(sheet, fileName){
        if(sheet.tiledversion){
            mapManager.loadSpriteSheet(sheet, 'tiled', fileName);
        }else{
            // @todo other sheets?
        }
        return mapManager.spriteSheets;
    }

    loadMap(mapData, name){
        mapManager.loadMapFromJSON(mapData, name);
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

