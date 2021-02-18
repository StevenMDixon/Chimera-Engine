import System_Base from './system_base';
import {SAT} from '../modules/collider';
import {convertToCollidable} from '../modules/utils';
import Vector from '../modules/vector';
import Event from '../core/event_system';

class Collision_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['Position', 'Solid'];
        this.order = 98;
    }

    init(){}

    update({deltaTime, entities}){
        const targetEntities = entities.query(...this.targetComponents);
        for (let m = 0; m < targetEntities.length; m++){
            for (let n = m + 1; n < targetEntities.length; n++)
            {
                let e1 = convertToCollidable(targetEntities[m]);
                let e2 = convertToCollidable(targetEntities[n]);
                //console.log(targetEntities[m], targetEntities[n])
                const collision = SAT(e1, e2);

                if(collision){
                    let resolveVector = Vector.multiply(collision.MTVAxis, {x: collision.smallestOverlap, y: collision.smallestOverlap})
                    Event.publish('collision', {e1: targetEntities[n], e2: targetEntities[m], resolution: resolveVector, gameObject: entities})
                }    
            }
        }
    }
}

export default Collision_System;

