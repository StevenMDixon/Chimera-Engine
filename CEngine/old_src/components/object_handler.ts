import GameObject from './gameObject';

class Object_Handler {
    gameObjects: any;
    UUIDTrack: number;
    qCount: number;
    qSteps: number;
    constructor(){
        this.gameObjects = new Map();
        this.UUIDTrack = 0;
        this.qCount = 100;
        this.qSteps = 20;
        this.populate();
    }

    populate() : void {
        for(let i = 0; i < this.qCount; i++){
            this.gameObjects.set(this.UUIDTrack, new GameObject(this.UUIDTrack));
            this.UUIDTrack += 1;
        }
    }

    expand(by = this.qSteps) : void {
        for(let i = 0; i < by; i++){
            this.gameObjects.set(this.UUIDTrack, new GameObject(this.UUIDTrack));
            this.UUIDTrack += 1;
        }
    }

    available(): number {
        let total = 0
        for (let [key, value] of this.gameObjects){
            if(!value.isActive) total++;
        }
        return total;
    }

    getAvailable() {
        let available = []
        for (let [key, value] of this.gameObjects){
            if(!value.isActive) available.push(key);
        }
        return available;
    }

    addGameObject(go) :void {

        // CREATE LOGIC TO SET AN EXISTIC OBJECT 
        let available = this.available();
        if (go.length >= available){
            this.expand(go.length - available);
        }

        let index = 0;
        let gameObjects = this.getAvailable();

        go.forEach(t => {
            let co = this.gameObjects.get(gameObjects[index]);
            t.forEach(item =>{
               co.addComponent(item);
            })
            co.isActive = true;
            // item.UUID = this.UUIDTrack;
            // item.isActive = true;
            // this.gameObjects.set(this.UUIDTrack, item);
            index++
        });
    }

    removeGameObject(go: GameObject): void {
        let component = this.gameObjects.get(go.UUID);
        component.clearComponents();
        component.isActive = false;
    }

    // grabs all components with the listed components
    query(...names:  string[]): GameObject[]{
        let items = [];
        for (let [key, value] of this.gameObjects){
            if(value.isActive && value.hasComponent(...names)) {items.push(value)}
        }
        return items;
    }
}

export default Object_Handler;