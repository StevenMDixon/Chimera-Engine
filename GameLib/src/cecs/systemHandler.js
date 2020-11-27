class SystemHandler {
    constructor(){
        this.systems = [];
        this.currentIndex = 0;
    }

    registerSystem(system){
        this.systems.push(system);
    }

    next(){
        this.currentIndex += 1;
        if(this.currentIndex == this.systems.length){
            this.systems[this.currentIndex](this.done);
        }else {
            this.systems[this.currentIndex](this.next);
        }
    }

    done(){
        this.currentIndex = 0;
    }

    run(){
        
    }
}


export default new SystemHandler();