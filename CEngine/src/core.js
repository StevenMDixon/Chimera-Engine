
import {config} from './config/config.js';
import storeFactory from './managers/store/storeFactory.js';
import eventManager from  './managers/event/eventManager';
import InputManager from './managers/input/inputManager';
import {ECSManager, built_in, components, system} from './cecs';
import Stats from 'stats.js'

import {PixiScene, PixiRenderer} from './pixi_templates/index';

class GameEngine {
    constructor(){
        this.config = {};
        this.scenes = {};
        this.currentScene = null;
        this.renderer = null;
        this.loader = null;
        this.debug = false;
        this.stats = new Stats();
    }

    setConfig(configObject){
        this.config = configObject;

        // create pixi renderer
        if('pixiSettings' in configObject){
            this.renderer = new PixiRenderer(configObject.pixiSettings);
            this.loader = configObject.pixiSettings.PIXI.Loader.shared;
        };

        if(this.config.debug){
            this._addDebugInfo();
            this.debug = true;
        }

        InputManager.sendTo(this._routeInputs.bind(this));
        
    }

    load(...assets){
        if(this.renderer.type = 'PIXI'){
            assets.forEach(item => this.loader.add(item.name, item.file));
            this.loader.load();
        }
    }

    start(){
        this.loader.onComplete.add(() => {
            this._createScenes();
            Object.values(this.scenes).forEach(scene => scene._load());
            this._run();
        })
    }

    _gotoScene(sceneName){
        // @todo add error handling here
        this.currenScene = this.scenes[sceneName];
    }

    _run(ts = 0, time = 0){
        if(this.debug){
            this.stats.begin();
        }
        
        const deltaTime =  ts - time;
        time = ts;

        //events.finalize();
        this.currentScene.update(deltaTime);
        this.currentScene.world._runUpdate(deltaTime);

        if(this.renderer.type == 'PIXI' && this.currentScene){
            this.renderer.render(this.currentScene.stage);
        }

        if(this.debug){
            this.stats.end();
        }
        requestAnimationFrame((timeStamp) => this._run(timeStamp, time));
    };

    _createScenes(){
        if(this.renderer.type == 'PIXI'){
            this.config.scenes.forEach(scene => {
                // create new scene and pass in needed engine items
                let tempScene = null;
                tempScene = new scene(
                    {
                        PIXI: this.config.pixiSettings.PIXI,
                        GlobalStore: storeFactory, 
                        Entities: ECSManager,
                        Event: eventManager
                    });
                // register built in pixi systems
                tempScene.world.registerSystems(built_in);
                // add new scene to scenes
                this.scenes[tempScene.name] = tempScene;
            })
        }
        this.currentScene = Object.values(this.scenes)[0];
        console.log(this.currentScene)
    }

    _addDebugInfo(){
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild( this.stats.dom );
    }

    _routeInputs(inputs){
        eventManager.publishEventtoChild('&inputs_updated', inputs, this.currentScene._name);
    }
}

function core(){
    // create a store for the engine to use
    storeFactory.createStore('engine', config);
    // expose needed functionality
    return {
        engine: new GameEngine(),
        sceneTemplates: {PixiScene},
        systemTemplate: system,
        components: components.comp
    }
}


export default core();

