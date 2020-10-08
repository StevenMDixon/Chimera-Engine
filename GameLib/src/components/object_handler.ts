import GameObject from './gameObject';

class Object_Handler {
    gameObjects: GameObject[];

    constructor(){
        this.gameObjects = [];
    }

    addGameObject(go: GameObject[]) :void {
        go.forEach(item => this.gameObjects.push(item))
    }

    // grabs all components with the listed components
    query(...names:  string[]): GameObject[]{
        // do not console log in this function
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