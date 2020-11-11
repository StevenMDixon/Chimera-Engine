import {Component} from './components';

//instanceof might help
class GameObject{
    components: any;
    children: GameObject[];
    UUID: number;
    isActive: boolean;

    constructor(uuid?){
        this.components = new Map();
        this.UUID = uuid;
        this.isActive = false;
        // @Todo implement children
        //this.children = [] as GameObject[];
    }

    addComponent(component: any): void{
        component.gameObject = this;
        this.components.set(component.__proto__.constructor.name, component);
    }

    removeComponent(name): void{
        this.components.delete(name);
    }

    getComponent(name: string){
        return this.components.get(name);
    }

    getComponents(): any[]{
        return this.components.entries;
    }

    hasComponent(...names: string[]): boolean{
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

export default GameObject;