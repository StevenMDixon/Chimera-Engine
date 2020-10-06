import {Component} from './components';

//instanceof might help
class GameObject{
    components: any;
    children: GameObject[];
    constructor(){
        this.components = new Map();
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

    addComponent(name: string, component: any): void{
        component.gameObject = this;
        this.components.set(name, component);
    }

    getComponent(name: string){
        return this.components.get(name);
    }

    hasComponent(name: string){
        return this.components.has(name);
    }
}

export default GameObject;