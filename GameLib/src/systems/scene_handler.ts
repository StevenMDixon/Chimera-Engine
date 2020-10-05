import Scene from '../classes/scene';
import controller from '../modules/inputController';
import api from './system_api'; 

import store from '../modules/store';


class Scene_Handler {
    scenes: Scene[];
    api: any
    engineStore: {
        [key: string]: any
    };
    assetStore: {
        [key: string]: any
    };
    userStore: {
        [key: string]: any
    }

    public constructor(){
        this.scenes = [];
        this.api = null;
        this.userStore = store.createStore('user', {});
        this.engineStore = store.getStore('engine');
        this.assetStore = store.getStore('asset');

    }

    public setup(){
        const {controllerEnabled, controllerMap, scenes} = this.engineStore.access();

        controller.overrideControllerMapping(controllerMap);
        controller.setup(this._handleInput.bind(this), controllerEnabled);
    
        //create new scenes from scenes in engineStore
        store.getStore('engine').update('currentScene', Object.keys(scenes)[0])
        // define the api to be used in scenes
        this.api = api();
        this._initScenes(scenes);
    }


    
    public _update(deltaTime){
        const {camera, totalTime, currentScene} = this.engineStore.access();
        this.scenes[currentScene].update(deltaTime);
        //TODO Handle entity traits
        camera.updateCamera();
        this._draw(deltaTime);
    }

    private _draw(deltaTime): void{
        const {ctx, debug, currentScene, totalTime} = this.engineStore.access();

        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);
 

        let LeveltoDraw = this.api.getLevelObject();

        if(LeveltoDraw){
            if(LeveltoDraw.tileLayers.Ground){
                LeveltoDraw.tileLayers.Ground.forEach(tile => this.api.drawTile(tile, LeveltoDraw.spriteSheet));
            }
            // draw entities over base layer

            // draw layers over
            Object.keys(LeveltoDraw.tileLayers).forEach(layer => {
                if(layer !== 'Ground'){
                    LeveltoDraw.tileLayers[layer].forEach(tile => this.api.drawTile(tile, LeveltoDraw.spriteSheet));
                }
            })
        }else {

        } 

        this.scenes[currentScene].draw(deltaTime);
         // draw debug info
         if (debug){
             ctx.font = '20px Arial';
             ctx.fillStyle = 'red';
             ctx.fillText(`FPS: ${Math.floor(1/( deltaTime/1000))}`, ctx.canvas.width - 80, 20);
         }
     }


    private _initScenes(scenes): void{
        const {currentScene, camera} = this.engineStore.access('currentScene', 'camera');
        for(let scene in scenes){
            this.scenes[scene] = new scenes[scene]({store: this.userStore, api: this.api})
            this.scenes[scene].setup();
        }
        if(this.scenes[currentScene]['player']){
            camera.attach(this.scenes[currentScene]['player']);
        }
    }

    private _handleInput(data){
        const {currentScene} = this.engineStore.access('currentScene');
        if(this.scenes[currentScene] && this.scenes[currentScene]){
            //pass input data from keyboard/controller to the current scene
            this.scenes[currentScene]._handleInput(data);
        }
    }
            
    }

export default Scene_Handler;