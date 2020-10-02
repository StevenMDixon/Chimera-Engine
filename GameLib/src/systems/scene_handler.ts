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

    constructor(engineStore, assetStore){
        this.scenes = [];
        this.engineStore = engineStore;
        this.assetStore = assetStore;
        this.api = api(engineStore);
        this.userStore = store({})
    }

    setup(){
        const {controllerEnabled, controllerMap, scenes} = this.engineStore.access();

        //use code from 

        controller.overrideControllerMapping(controllerMap);
        controller.setup(this.handleInput.bind(this), controllerEnabled);
    
        //create new scenes from scenes in engineStore
        this.engineStore.update('currentScene', Object.keys(scenes)[0])
        this.initScenes(scenes);

        console.log(this.api)
    }


    
    update(deltaTime){
        const {camera, totalTime} = this.engineStore.access();
        camera.updateCamera();
        this.draw(deltaTime);
    }

    draw(deltaTime): void{
        const {ctx, enableDebug, currentScene} = this.engineStore.access();

        // draw background
         ctx.clearRect(0,0,ctx.canvas.clientWidth, ctx.canvas.height)
         ctx.fillStyle = '#000';
         ctx.fillRect(0,0, ctx.canvas.clientWidth, ctx.canvas.height);
         //draw current scene
 
        //  let LeveltoDraw = this.screens[this.currentScreen].getLevel()
        //  if(LeveltoDraw){
        //      LeveltoDraw.draw(deltaTime, this.totalTime, this.imageManager.getLevelRenderer(), camera);
        //  }
 
 
         this.scenes[currentScene].draw(deltaTime);
         
         // draw debug info
         if (enableDebug){
             ctx.font = '10px Arial';
             ctx.fillStyle = 'red';
             ctx.fillText(`FPS: ${Math.floor(1/( deltaTime/1000))}`, ctx.canvas.width - 40, 10);
         }
     }


    initScenes(scenes): void{
        const {currentScene, camera} = this.engineStore.access('currentScene');
        for(let scene in scenes){
            this.scenes[scene] = new scenes[scene]({store: this.userStore, api: this.api})
            this.scenes[scene].setup();
        }
        if(this.scenes[currentScene]['player']){
            camera.attach(this.scenes[currentScene]['player']);
        }
    }

    gotoScreen(target: string): void{
        //this.currentScreen = target;
        //this.controller.changeFn(this.screens[this.currentScreen].handleInput.bind(this.screens[this.currentScreen]));
    }

    handleInput(data){
        const {currentScene} = this.engineStore.access('currentScene');
        if(this.scenes[currentScene] && this.scenes[currentScene]){
            //pass input data from keyboard/controller to the current scene
            this.scenes[currentScene].handleInput(data);
        }
    }
            
    }

export default Scene_Handler;