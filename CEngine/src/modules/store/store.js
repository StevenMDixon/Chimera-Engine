class store{
    constructor(intitialProps){
        this._store =  new Map();
        Object.keys(intitialProps).map(key => this._store.set(key, intitialProps[key]));
    }
    update(data){
        for( const [key, value] of Object.entries(data)){
            this._store.set(key, value);
        }
    }
    set(data) {
        Object.keys(data).map(key => {
            if(data[key] !== undefined){
                this._store.set(key, data[key]);
            }
        })   
    }
    get data(){
        return Object.fromEntries(this._store);
    }
    access(...key){
         if (key.length > 0){
         return key.reduce((o,k)=> {
                o[k] = _store.get(k);
                return o; 
            }, {})

        }  else {
            let store = {};
            this._store.forEach((value, key) => store[key] = value);
            return store;
        } 
    }
    // getDataTools(){
    //     return{
    //         update: this.update.bind(this),
    //         access: this.access.bind(this),
    //         set: this.set.bind(this)
    //     }
    // }
}


export default store;