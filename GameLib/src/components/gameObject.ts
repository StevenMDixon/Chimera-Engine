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
        this.children = [] as GameObject[];
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

    getComponent(name: string){
        return this.components.get(name);
    }

    getComponents(name: string){
        return this.components.entries;
    }

    hasComponent(name: string){
        return this.components.has(name);
    }
}

export default GameObject;