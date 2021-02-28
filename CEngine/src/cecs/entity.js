//instanceof might help
class Entity {
    constructor(uuid, parent){
        this._parent = parent; // parent entityhandler instance
        this.components = new Map();
        this.UUID = uuid;
        this.isActive = false;
        // @Todo implement children?
        //this.children = [] as GameObject[];
    }

    addComponent(component){
        component.parent = this;
        this.components.set(component.__proto__.constructor.name, component);
    }

    removeComponent(name){
        this.components.delete(name);
        this.parent._reassignEntity(this);
    }

    getComponent(name){
        return this.components.get(name);
    }

    getComponents(){
        return this.components.entries;
    }

    hasComponents(names){
        let has = true;
        for(let i = 0; i < names.length; i++){
            //console.log(names[i], this.components.has(names[i]))

            if (!this.components.has(names[i])){
                has = false;
                break;
            }
        }
        if(this.components.length == 0) has = false;
        else if(names.length == 0) has = false;
        return has;
    }

    clearComponents(){
        this.components.clear();
        // needs to signal that component was removed?
        this._parent._triggerEntityReassignment(this);
    }
}

export default Entity;