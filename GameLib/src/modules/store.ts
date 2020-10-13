

function store(intitialProps){

    const  _store =  new Map();

    Object.keys(intitialProps).map(key => _store.set(key, intitialProps[key]))

    return {
       
        update: function(key, data){
            _store.set(key, data);
        },
        set: function (data: object) {
            Object.keys(data).map(key => {
                if(data[key] !== undefined){
                    _store.set(key, data[key]);
                }
            })   
        },
        get store(){
            return _store.entries();
        },
        access: function(...key){
             if (key.length > 0){
             return key.reduce((o,k)=> {
                    o[k] = _store.get(k);
                    return o; 
                }, {})

            }  else {
                let store = {};
                _store.forEach((value, key) => store[key] = value);
                return store;
            } 
        },
        getDataTools: function (){
            return{
                update: this.update.bind(this),
                access: this.access.bind(this),
                set: this.set.bind(this)
            }
        }
    }

}

class Store_Factory {
    private _stores: any
    constructor(){
        this._stores = {}
    }
    createStore(name, data){
        this._stores[name] = store(data);
        return this._stores[name];
    }
    getStore (name){
        return this._stores[name];
    }
}

const instance = new Store_Factory();
Object.freeze(instance)

export default instance;