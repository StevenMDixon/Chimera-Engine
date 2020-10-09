import System_Base from './system_base';
import {AABB, DIAG} from '../modules/collider'

class Collision_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['Solid'];
    }

    init(){
        
    }

    update(deltaTime, enities){
        //console.log(enities)
        // May need to filter static entities vs entities that are moving
        // check vs static then check vs other?


        //@TODO imploemt collision checker
        enities.forEach(e => {
            if(e.hasComponent('Polygon')){
                
            }
        })
    }
}

export default Collision_System;