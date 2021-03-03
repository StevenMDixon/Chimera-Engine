class SystemHandler {
    constructor(parent){
        this._parent = parent;
        this.systems = [];
        this.currentIndex = 0;
        this.isRunning = false;
    }

    get event(){
        return this._parent._parent._event;
    }

    // triggered when a component is added or removed
    _reassignEntity(Entity){
        if(this.systems.length == 0) return
        this.systems.forEach(system => {
            let systemHas = system._checkfortaggedEntity(Entity.UUID);
            // check if system needs to add
            if(!systemHas){
                this._assignEntitytoSystem(Entity, system);
            } else {
                this._removeEntityfromSystem(Entity, System);
            }
        })
    }

    // initial registration of entity when entity is added
    _assignEntity(Entity){
        //console.log(Entity, 'e')
        if(this.systems.length == 0) return
        this.systems.forEach(system => {
            // list of criteria for an entity to be registed to a system
            let criteria = system.targetComponents;
            let xCriteria = system.excludeComponents;
            if(Entity.hasComponents(...criteria) && !Entity.hasComponents(...xCriteria)){
                system._registerEntityTag(Entity);
            }
        })
    }

    _assignEntitytoSystem(Entity, System){
        let criteria = System.targetComponents || [];
        let xCriteria = System.excludeComponents || [];
       //console.log(Entity.hasComponents(criteria))
        if(Entity.hasComponents(criteria) && !Entity.hasComponents(xCriteria)){
            System._registerEntityTag(Entity);
            return true;
        }else {
            return false;
        }
    }

    _removeEntityfromSystem(Entity, System){
        System._unregisterEntity(Entity.UUID);
    }

    registerSystem(system){
        system._parent = this;

        system.onCreate();
        this.systems.push(system);

    }

    registerEntity(entity_ptr){
        this.systems.forEach(sys => {
            this._assignEntitytoSystem(entity_ptr, sys);
        });
    }

    next(dt){
        this.currentIndex += 1;
        if(this.currentIndex == this.systems.length){
            this.done();
        }else {
            this.systems[this.currentIndex].update(this.next.bind(this, dt), dt);
        }
    }

    done(){
        this.currentIndex = 0;
        this.isRunning = false;
        this.event.finalize();
    }

    run(dt){
        if(!this.isRunning){
            this.isRunning = true;
            this.systems[this.currentIndex].update(this.next.bind(this, dt), dt)
        }
    }


}


export default SystemHandler;