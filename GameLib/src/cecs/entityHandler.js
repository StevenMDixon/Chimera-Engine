import Entity from './entity';

class EntityHandler {

    constructor(){
        this.entities = new Map();
        this.UUIDTrack = 0;
        this.qCount = 100;
        this.qSteps = 20;
        this.populate();
    }

    populate() {
        for(let i = 0; i < this.qCount; i++){
            this.entities.set(this.UUIDTrack, new Entity(this.UUIDTrack));
            this.UUIDTrack += 1;
        }
    }

    expand(by = this.qSteps) {
        for(let i = 0; i < by; i++){
            this.entities.set(this.UUIDTrack, new Entity(this.UUIDTrack));
            this.UUIDTrack += 1;
        }
    }

    available() {
        let total = 0
        for (let [key, value] of this.entities){
            if(!value.isActive) total++;
        }
        return total;
    }

    getAvailable() {
        let available = []
        for (let [key, value] of this.entities){
            if(!value.isActive) available.push(key);
        }
        return available;
    }

    addEntity(go) {

        let available = this.available();
        if (go.length >= available){
            this.expand(go.length - available);
        }

        let index = 0;
        let entities = this.getAvailable();

        go.forEach(t => {
            let co = this.entities.get(entities[index]);
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

    removeEntity(go) {
        let component = this.entities.get(go.UUID);
        component.clearComponents();
        component.isActive = false;
    }

    // grabs all components with the listed components
    query(...names) {
        let items = [];
        for (let [key, value] of this.entities){
            if(value.isActive && value.hasComponent(...names)) {items.push(value)}
        }
        return items;
    }
}

export default new EntityHandler();