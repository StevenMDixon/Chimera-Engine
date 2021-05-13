import {built_in} from '../ecs';

class SceneManager {
    constructor(){
        this.sceneClass = {};
        this.scenes = {};
        this.currentScene = null;
    }

    createScenes(scenes, data){
        console.log(scenes)
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

    }

    resetCurrentScene(){

    }

}


function sceneFactory(Scene, data){
    const scene = new Scene();
    const {config, managers} = data;
    scene._store = managers.store.createStore(scene._name, {
        world: managers.world.createContext(scene._name, scene),
        event: managers.event.createEventHandler(scene._name),
        global: data
    });

    if(config.pixiSettings){
        scene._addPixiData(config.pixiSettings.PIXI);
        // register built in pixi systems
        scene.world.registerSystems(built_in);
    }
    
    return scene;
}

export default new SceneManager()