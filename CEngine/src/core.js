import events from './event/eventHandler.js';
import {config} from './config/config.js';
import storeFactory from './store/storeFactory.js';

import cec from './cecs';
import cecs from './cecs';


import {PixiScene, PixiRenderer} from './pixi_templates/index';


class GameEngine {
    constructor(){
        this.systems = {};
        this.config = {};
        this.scenes = {};
        this.currenScene = null;
        this.renderer = null;
        this.loader = null;
        this.debug = false;
        this.debugTarget = null;
    }

    setConfig(configObject){
        this.config = configObject;

        // create pixi renderer
        if('pixiSettings' in configObject){
            this.renderer = new PixiRenderer(configObject.pixiSettings);
            //console.log('PIXI is set as Renderer', this.renderer);
            this.loader = configObject.pixiSettings.PIXI.Loader.shared;
        };

        if(this.config.debug){
            this._addDebugInfo();
            this.debug = true;
        }
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

    gotoScene(sceneName){
        // @todo add error handling here
        this.currenScene = this.scenes[sceneName];
    }

    _run(ts = 0, time = 0){
        const deltaTime =  ts - time;

        time = ts;

        if(this.debugTarget){
            //console.log(this.debugTarget.innerText)
            this.debugTarget.innerText = 'FPS: ' + Math.floor(1/(deltaTime/1000))
        }
        //events.finalize();

        if(this.renderer.type == 'PIXI' && this.currenScene){
            this.renderer.render(this.currenScene.getStage());
        }
        requestAnimationFrame((timeStamp) => this._run(timeStamp, time));
    }

    _createScenes(){
        if(this.renderer.type == 'PIXI'){
            this.config.scenes.forEach(scene => {
                let tempScene = null;
                console.log(this.config)
                tempScene = new scene({PIXI: this.config.pixiSettings.PIXI, GlobalStore: storeFactory});
                this.scenes[tempScene.name] = tempScene;
            })
        }
        this.currenScene = Object.values(this.scenes)[0];
    }

    _addDebugInfo(){
        let wrapper= document.createElement('div');
        wrapper.innerHTML= "<p id='dev-fps' style= 'color: white; background-color: black; font-size: 30px; margin: 0; padding: 0;'></p>";
        document.body.prepend(wrapper);
        this.debugTarget = document.getElementById('dev-fps');
    }
}

function core(){
    // create a store for the engine to use
    storeFactory.createStore('engine', config);
    //cecs.systemHandler.registerSystem(new cecs.built_in());
    return {
        engine: new GameEngine(),
       // ecs: cec,
       // store: storeFactory,
       // events: events,
        sceneTemplates: {PixiScene}
    }
}


export default core();

