import Entity from './entity';

class EntityHandler {

    constructor(parent){
        this._parent = parent;
        this.entities = new Map();
        this.UUIDTrack = 0;
        this.qCount = 20;
        this.qSteps = 20;
        this.populate();
    }

    get size(){
        return this.entities.size;
    }

    populate() {
        for(let i = 0; i < this.qCount; i++){
            this.entities.set(this.UUIDTrack, new Entity(this.UUIDTrack, this));
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
        const available = []
        for (let [key, value] of this.entities){
            if(!value.isActive) available.push(key);
        }
        return available;
    }

    getEntity(UUID){
        return this.entities.get(UUID)
    }

    addEntity(ComponentList){
        const available = this.available();
        if (!available){
            this.expand(1);
        }
    
        const entity = this.getAvailable()[0];
        const targetEntity = this.entities.get(entity);
        targetEntity.isActive = true;
        ComponentList.forEach(item =>{
                targetEntity.addComponent(item);
        })

        return targetEntity;
    }

    addEntities(entityArray) {
        const available = this.available();
        if (entityArray.length >= available){
            this.expand(entityArray.length - available);
        }

        let index = 0;
        const entities = this.getAvailable();

        entityArray.forEach(entity => {
            let targetEntity = this.entities.get(entities[index]);
            targetEntity.isActive = true;
            entity.forEach(item =>{
                targetEntity.addComponent(item);
            })
            index++;
        });
    }

    removeEntity(Entity) {
        const targetEntity = this.entities.get(Entity.UUID);
        targetEntity.isActive = false;
        targetEntity.clearComponents();
    }
}

export default EntityHandler;