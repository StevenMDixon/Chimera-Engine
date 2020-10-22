import {Component} from './components';

//instanceof might help
class GameObject{
    components: any;
    children: GameObject[];
    UUID: number;
    constructor(){
        this.components = new Map();
        this.UUID = null;
        // @Todo implement children
        //this.children = [] as GameObject[];
    }

    start(): void{
        this.components.forEach((component, name) => {
            component.start();
        })
    }

    update(dt: number): void{
        this.components.forEach((component, name) => {
            component.update(dt);
        })
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
        return has;
    }
}

export default GameObject;