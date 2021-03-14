import SystemHandler from './systemHandler';
import EntityHandler from './entityHandler';
import Components from './components';

class ECSContext {
    constructor(parent){
        this._parent = parent;
        this.systemHandler = new SystemHandler(this);
        this.entityHandler = new EntityHandler(this);
    }

    registerSystems(systems){
        // take in built in systems like pixi_system and create them then move references to entities
        systems.forEach(sys => this.systemHandler.registerSystem(new sys(), this._parent));
    }

    registerSystem(system){
        // allows user to register their own systems
        this.systemHandler.registerSystem(new system(),this._parent);
    }

    composeEntity(componentsList){
        let e = this.entityHandler.addEntity(componentsList);
        this.systemHandler.registerEntity(e);
        return e;
    }   

    composeEntities(listofComponentGroups){
        this.entityHandler.addEntities(listofComponentGroups);
    }

    getEntitybyUUID(UUID){
        return this.entityHandler.getEntity(UUID);
    }

    freeEntity(Entity){
        const removed = this.entityHandler.removeEntity(Entity);
        // @todo deregister entity from all systems
        this.systemHandler.forEach(system => system._unregisterEntity(removed.UUID));
    }

    // build a bridge! 
    _runUpdate(dt){
        this.systemHandler.run(dt);
    }

    // _reassignEntityBridge(e){
    //     this.systemHandler._reassignEntity(e);
    // }

    // _assignEntityBridge(e){
    //     this.systemHandler._assignEntity(e);
    // }

    // _assignEntitytoSystemBridge(e,s){
    //     this.systemHandler._assignEntitytoSystem(e,s);
    // }

}

class ECSManager {
    constructor(){
        this.ECS = {};
    }

    createContext(contextName, parent){
        // create a new context
       this.ECS[contextName] = new ECSContext(parent);
       // return that context for the scene to consume
       return this.ECS[contextName];
    }

    addComponents(componentClassList){
        Components.addComponents(componentClassList);
    }

    getComponentsList(){
        return Components.components;
    }
}


export default new ECSManager();