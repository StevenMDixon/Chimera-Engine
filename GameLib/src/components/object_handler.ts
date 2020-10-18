import GameObject from './gameObject';

class Object_Handler {
    gameObjects: any;
    UUIDTrack: number;
    constructor(){
        this.gameObjects = new Map();
        this.UUIDTrack = 0;
    }

    addGameObject(go: GameObject[]) :void {
        go.forEach(item => {
            item.UUID = this.UUIDTrack;
            this.gameObjects.set(this.UUIDTrack, item);
            this.UUIDTrack++;
        })
    }

    removeGameObject(go: GameObject): void {
        this.gameObjects.delete(go.UUID);
    }

    // grabs all components with the listed components
    query(...names:  string[]): GameObject[]{
         let items = [];
         this.gameObjects.forEach(go => {
            let r = true;
            for(let i = 0; i < names.length; ++i){
                if(go.hasComponent(names[i]) == false){
                    r = false;
                    break;
                }
            }
            if(r) items.push(go)
        })
        return items;
    }
}

export default Object_Handler;