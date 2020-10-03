import Store from '../modules/store';

class System {

    store: {
        [key: string]: any
    };

    constructor(store){
        this.store = store;
    }

    getTools(){}
}

export default System;