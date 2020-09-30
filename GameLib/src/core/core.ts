// cores job is to setup the environment and implement the built in systems

import {config} from './config';

import Store from '../modules/store'
import Renderer from '../systems/renderer';




function core(){
    // general shared store for engine
    const engineStore = Store(config);
    // store to be passed to users screens
    const userStore = Store({});
    // create renderer pass in global store
    const renderer = new Renderer(engineStore);

    console.log(engineStore)

    return {

        setup(){

        }

    }

}


// making core a singleton no need for the user to redefine stuff
export default core()