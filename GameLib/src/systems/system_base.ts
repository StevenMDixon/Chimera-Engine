import Store from '../modules/store';

class System {

    store: {
        [key: string]: any
    };

    constructor(store){
        this.store = store;
    }

    getTools(){
        // all systems will have a get tools method
    }
}

export default System;