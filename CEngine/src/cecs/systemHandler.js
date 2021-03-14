'use strict'

class SystemHandler {
    constructor(parent){
        this._parent = parent;
        this.systems = [];
        this.isRunning = false;
    }

    // triggered when a component is added or removed
    _reassignEntity(entity){
        if(this.systems.length == 0) return
        this.systems.forEach(system => {
            let systemHas = system._checkfortaggedEntity(entity.UUID);
            // check if system needs to add
            if(!systemHas){
                this._assignEntitytoSystem(entity, system);
            } else {
                this._removeEntityfromSystem(entity, system);
            }
        })
    }

    _checkSystemCritera(Entity, System){
        // list of criteria for an entity to be registed to a system
        return (Entity.hasComponents(System.targetComponents) && !Entity.hasComponents(System.excludeComponents));
    }

    // initial registration of entity when entity is added
    _assignEntity(entity){
        if(this.systems.length == 0) return false;
        this.systems.forEach(system => {
            if(this._checkSystemCritera(entity, system)){
                system._registerEntityTag(entity);
            }
        });
    }

    _assignEntitytoSystem(entity, system){
        if(this._checkSystemCritera(entity, system)){
            system._registerEntityTag(entity);
            return true;
        }else {
            return false;
        }
    }

    _removeEntityfromSystem(entity, system){
        system._unregisterEntity(entity.UUID);
    }

    _next(dt){
        this.currentIndex += 1;
        if(this.currentIndex == this.systems.length){
            this._done();
        }else {
            this.systems[this.currentIndex].update(this._next.bind(this, dt), dt);
        }
    }

    _done(){
        this.currentIndex = 0;
        this.isRunning = false;
    }

    registerEntity(entity){
        this._assignEntity(entity);
    }

    registerSystem(system, context){
        // the system is already instantiated so parent needs to be assigned here
        system._parent = this;
        system._sceneContext = context;
        // call on create from system
        system.onCreate();
        // add the system to the list
        this.systems.push(system);
    }

    run(dt){
        // if(!this.isRunning){
        //     this.isRunning = true;
        //     this.systems[this.currentIndex].update(this._next.bind(this, dt), dt)
        // }
        let c = (dt)=> {}
        for(const system of this.systems){
            system.update(c, dt)
        }
        this._done();
    }
}


export default SystemHandler;