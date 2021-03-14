
import {config} from './config/config.js';
import storeFactory from './managers/store/storeFactory.js';
import eventManager from  './managers/event/eventManager';
import InputManager from './managers/input/inputManager';
import mapManager from './managers/map/mapManager';
import {ECSManager, built_in, components, system} from './cecs';
import Stats from 'stats.js'

import {PixiScene, PixiRenderer} from './pixi_templates/index';
import soundManager from './managers/sound/soundManager.js';

class GameEngine {
    constructor(){
        // create a store for the engine to use
        this.store = storeFactory.createStore('engine', config);
        this.store.set(
            {
                config: {},
                scenes: {},
                currentScene: null,
                renderer: null,
                loader: null,
                debug: false,
                managers: {
                    eventManager,
                    InputManager,
                    mapManager,
                    ECSManager
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
        const {loader} = this.store.data;
        loader.onComplete.add(() => {
           
            let scenes = this._createScenes();
            for(const [k, scene] of Object.entries(scenes)){
                scene._load();
            }
            this._run();
        })
    }

    _gotoScene(sceneName){
        // @todo add error handling here
        const {scenes} = this.store.data;
        this.store.update({currentScene: scenes[sceneName]});
    }

    _run(ts = 0){
        const {debug, currentScene, renderer} = this.store.data;

        if(debug){
            this._stats.begin();
        }
        
        currentScene.update(ts - this._lastTime);
        currentScene.world._runUpdate(ts - this._lastTime);

       if(renderer.type == 'PIXI' && currentScene){
            renderer.render(currentScene.stage);
        }

        if(debug){
            this._stats.end();
        }

        this._lastTime = ts;

        eventManager.finalize(currentScene.name);

        requestAnimationFrame(this._run.bind(this));
    };

    _createScenes(){
        const {renderer, config} = this.store.data;
        const scenes = {};
        if(renderer.type == 'PIXI'){
            for (const scene of config.scenes){
                let tempScene = new scene();
                tempScene._store = storeFactory.createStore(tempScene._name, {
                    world: ECSManager.createContext(tempScene._name, tempScene),
                    event: eventManager.createEventHandler(tempScene._name),
                    global: this.store.data
                });

                tempScene._addPixiData(config.pixiSettings.PIXI);
                // register built in pixi systems
                tempScene.world.registerSystems(built_in);
                // add new scene to scenes
                scenes[tempScene._name] = tempScene;
            }
        }
        this.store.update({scenes: {...scenes}, currentScene: Object.values(scenes)[0]});
        return scenes;
    }

    _addDebugInfo(){
        this._stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this._stats.dom);
    }

    _routeInputs(inputs){
        const {currentScene} = this.store.data;
        eventManager.publishEventtoChild('&inputs_updated', inputs, currentScene._name);
    }

    _routePixiAudio(command){
        const {loader, currentScene} = this.store.data;
        const audioFiles = {};
        for(const [k, property] of Object.entries(loader.resources)){
            if(property.sound){
                audioFiles[k] = property;
            }
        }
        for(const [k, property] of Object.entries(currentScene.loader.resources)){
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

