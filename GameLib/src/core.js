import events from './event/eventHandler.js';
import {config} from './config/config.js';
import cec from './cecs';
import storeFactory from './store/storeFactory.js';



class GameEngine {
    constructor(){

    }

    init(){
        
    }

    run(ts = 0, time = 0){
        //const {totalTime} = storeFactory.getStore('engine').access('totalTime');
        // set dt = new time - old time
        const deltaTime =  ts - time;

        time = ts;
        // tell the store there is a new total time
        //engineStore.update('totalTime',  totalTime + deltaTime);

        console.log(Math.floor(1/(deltaTime/1000)));
           
        requestAnimationFrame((timeStamp) => this.run(timeStamp, time))
    }
}

function core(){

    // create a store for the 
    storeFactory.createStore('engine', config);

    return {
        engine: new GameEngine(),
        ecs: cec,
        store: storeFactory
    }
}


export default core();

