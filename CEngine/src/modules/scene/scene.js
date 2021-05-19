import storeModule from '../store';
import {ECSModule} from '../ecs';
import MapModule from '../loader/map_loader'
import eventModule from '../event';
import actorLoader from '../loader/actor_loader';

class Scene{
    constructor(name){
        this._name = name;
        this._store = storeModule.createStore(name, {});
        this._world = ECSModule.createContext(name, this);
        this._map = MapModule;
        this._event =  eventModule.createEventHandler(name);
        this._global = null;
        this._actors = new actorLoader(this);
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
        return this._world;
    }

    get global(){
        return this._global;
    }

    get event(){
        return this._event;
    }

    get map(){
        return this._map;
    }

    get name(){
        return this._name;
    }

    get actors(){
        return this._actors;
    }
    
    _load(){}

    preload(){} // user defined

    setup(loader, resources){} // user defined

    update(dt){} // user defined

    loadActors(actorList){
        this._actors.load(actorList);
    }

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