//instanceof might help
class Entity{

    constructor(uuid){
        this.components = new Map();
        this.UUID = uuid;
        this.isActive = false;
        // @Todo implement children
        //this.children = [] as GameObject[];
    }

    addComponent(component){
        component.gameObject = this;
        this.components.set(component.__proto__.constructor.name, component);
    }

    removeComponent(name){
        this.components.delete(name);
    }

    getComponent(name){
        return this.components.get(name);
    }

    getComponents(){
        return this.components.entries;
    }

    hasComponent(...names){
        let has = true;
        for(let i = 0; i < names.length; i++){
            if (!this.components.has(names[i])){
                has = false;
                break;
            }
        }
        if(this.components.length == 0) return false;
        return has;
    }

    clearComponents(){
        this.components.clear();
    }
}

export default Entity;