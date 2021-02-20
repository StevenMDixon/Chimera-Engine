class SystemHandler {
    constructor(){
        this.systems = [];
        this.currentIndex = 0;
        this.isRunning = false;
    }

    registerSystem(system){
        this.systems.push(system);
    }

    registerEntity(entity_ptr){
        this.systems.forEach(sys => {

        });
    }

    next(entities){
        this.currentIndex += 1;
        let e = entities.query(this.systems[this.currentIndex].targetComponents);
        if(this.currentIndex == this.systems.length){
            this.systems[this.currentIndex].update(e, this.done.bind(this, entities));
        }else {
            this.systems[this.currentIndex].update(e, this.next.bind(this, entities));
        }
    }

    done(){
        this.currentIndex = 0;
        this.isRunning = false;
    }

    run(entities){
        if(!this.isRunning){
            this.isRunning = true;
            this.systems[this.currentIndex].update(entities, this.next.bind(this, entities))
        }
    }
}


export default SystemHandler;