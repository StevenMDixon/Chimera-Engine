import store from './store';

class Store_Factory {
    constructor(){
        this._stores = {}
    }
    createStore(name, data){
        this._stores[name] = new store(data);
        return this._stores[name];
    }
    getStore (name){
        return this._stores[name];
    }
}

const instance = new Store_Factory();
Object.freeze(instance);

export default instance;