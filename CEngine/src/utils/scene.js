class Scene{
    constructor(name, {GlobalStore, Event, Entities}){
        this._global = {
            Store: GlobalStore,
            Loader: null,
            Event: Event
        };
        this._name = name;
        this._world = Entities.createContext(name, this);
        this._store = this._global.Store.createStore(name, {});
        this._event = this._global.Event.createEventHandler(name);
    }

    get store(){
        return this._store;
    } 

    get world() {
        return this._world;
    }

    get global(){
        return this._global;
    }
    
    _load(){}

    preload(){} // user defined

    setup(loader, resources){} // user defined

    update(dt){} // user defined
}

export default Scene;