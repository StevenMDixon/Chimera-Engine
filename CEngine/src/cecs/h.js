// @todo rename this file and classes

import SystemHandler from './systemHandler';
import EntityHandler from './entityHandler'

class MContext {
    constructor(parent){
        this.parent = parent;
        this.systems = new SystemHandler();
        this.entities = new EntityHandler();
    }

    registerSystems(systems){
        console.log(systems)
        // take in built in systems like pixi_system and create them then move references to entities
        systems.forEach(sys => this.systems.registerSystem(new sys()))
    }

    // build a bridge! 
}

class Manager {
    constructor(){
        this.ECS = {};
    }

    createContext(contextName){
        // create a new context
       this.ECS[contextName] = new MContext(this)
       // return that context for the scene to consume
       return this.ECS[contextName];
    }
}


export default new Manager();