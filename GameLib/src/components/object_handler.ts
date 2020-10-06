import GameObject from './gameObject';

class Object_Handler {
    gameObjects: GameObject[];

    constructor(){
        this.gameObjects = [];
    }

    addGameObject(go: GameObject) :void {
        this.gameObjects.push(go)
    }

    // grabs all components with the listed components
    query(...names:  string[]): GameObject[]{
        return this.gameObjects.filter(go => {
            let r = true;
            for(let i = 0; i < names.length; ++i){
                if(go.hasComponent(names[i]) == false){
                    r = false;
                    break;
                }
            }
            return r;
        })
    }
}

export default Object_Handler;