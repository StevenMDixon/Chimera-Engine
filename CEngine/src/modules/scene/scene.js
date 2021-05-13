class Scene{
    constructor(name){
        this._name = name;
        this._store = null;
        // this._global = {
        //     Store: GlobalStore,
        //     Loader: null,
        //     Event: Event, 
        //     Map: Map,
        //     Entities
        // };
        
        // this._world = Entities.createContext(name, this);
        //  = this._global.Store.createStore(name, {});
        // this._event = this._global.Event.createEventHandler(name);
    }

    get store(){
        return this._store;
    } 

    get world() {
        const {world} = this._store.data;
        return world;
    }

    get global(){
        const {global} = this._store.data;
        return global;
    }

    get loader(){
        const {loader} = this._store.data;
        return loader;
    }

    get event(){
        const {event} = this._store.data;
        return event;
    }

    get map(){
        const {map} = this._store.data.global.managers;
        return map;
    }

    get name(){
        return this._name;
    }
    
    _load(){}

    preload(){} // user defined

    setup(loader, resources){} // user defined

    update(dt){} // user defined

    loadMap(mapName, ...fn){
        const map = this.map.maps.get(mapName);
        const components = this.global.Entities.getComponentsList();
        map.forEach(layer => {
            const {name, properties} = layer;
            // create layer if it does not exits
            if(!this._layers[name]){
                this.createLayer(name, properties.zindex || 0);
            }
            for(const item of layer.data) {
                const {position} = item
                const composed = [];
                // add new transform location
                composed.push(new components.Transform(position.x, position.y, position.rotation, position.scale));
                // let user define functions needed when loading map
                fn.forEach(mappedFunction => composed.push(mappedFunction(item, components))); 
                //
                // if(PIXItem){
                //     this.addToLayer(name, PIXItem);
                // }
                this.world.composeEntity(composed);
            }
        })
    }

    
}

export default Scene;