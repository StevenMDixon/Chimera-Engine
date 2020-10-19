import System_Base from './system_base';
import Store from '../core/store';
import Vector from "../modules/vector";
import Components from "../components/components";
import Event from '../core/event_system';

class Particle_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['Emitter'];
    }

    init(){
        Event.subscribe('create_particle', (data)=>this.create(data))
    }

    create(data){

    }

    update({deltaTime, entities}){
       const {camera, scale} = Store.getStore('engine').access('camera', 'scale');

        entities.query(...this.targetComponents).forEach(e => {
           //console.log(e)
       })
    }
}

export default Particle_System;