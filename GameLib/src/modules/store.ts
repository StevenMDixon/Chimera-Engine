
function store(intitialProps){

    const  _store =  new Map();

    Object.keys(intitialProps).map(key => _store.set(key, intitialProps[key]))

    return {
       
        update: function(key, data){
            _store.set(key, data);
        },
        set: function (data: object) {
            Object.keys(data).map(key => {
                if(data[key]){
                    _store.set(key, data[key]);
                }
            })   
        },
        get store(){
            return _store.values();
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


export default store;