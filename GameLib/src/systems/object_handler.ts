import system_base from './system_base';

class Object_Handler extends system_base{
    entities: any;

    constructor(store){
        super(store);
        this.entities = {};
    }

    getTools(){
        return {
            
        }
    }

    createObject(){

    }
}

export default Object_Handler;