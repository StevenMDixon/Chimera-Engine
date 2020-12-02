class SystemHandler {
    constructor(){
        this.systems = [];
        this.currentIndex = 0;
        this.isRunning = false;
    }

    registerSystem(system){
        this.systems.push(system);
    }

    next(entities){
        this.currentIndex += 1;
        let e = enitites.query(this.systems[this.currentIndex].targetComponents);
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

    run(enitites){
        if(!this.isRunning){
            this.isRunning = true;
            this.systems[this.currentIndex].update(entities, this.next.bind(this, entities))
        }
    }
}


export default new SystemHandler();