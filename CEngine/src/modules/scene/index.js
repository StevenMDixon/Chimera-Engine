import {built_in} from '../ecs';

class SceneModule {
    constructor(){
        this.sceneClass = {};
        this.scenes = {};
        this.currentScene = null;
    }

    createScenes(scenes, data){
        for(const Scene of scenes){
            let scene = sceneFactory(Scene, data);
            if(scene){
                this.sceneClass[scene._name] = Scene;
                this.scenes[scene._name] = scene;
                scene._load();
            }  
        }
        this.currentScene = Object.values(this.scenes)[0];
    }

    gotoScene(sceneName){
        this.currentScene = this.scenes[sceneName];
    }

    resetScene(sceneName){
        //@todo
    }

    resetCurrentScene(){
        //@todo
    }

}


function sceneFactory(Scene, data){
    const scene = new Scene();
    //set scenes global data
    scene._global = data;

    const {config} = data;

    if(config.pixiSettings){
        scene._addPixiData(config.pixiSettings.PIXI);
        // register built in pixi systems
        scene.world.registerSystems(built_in);
    }
    
    return scene;
}

export default new SceneModule()