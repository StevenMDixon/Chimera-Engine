import System_Base from './system_base';
import {SAT} from '../modules/collider';
import {getCenterOfPoly, createVerticesFromSize} from '../modules/utils';
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
                let e1 = {};
                let e2 = {};

                if(targetEntities[m].hasComponent("Polygon")){
                    const {vertices} = targetEntities[m].getComponent("Polygon");
                    e1['vertices'] = vertices;
                    e1['pos'] = getCenterOfPoly(vertices);
                }else if(targetEntities[m].hasComponent("Size")){
                    let {pos} = targetEntities[m].getComponent("Position");
                    let {size} = targetEntities[m].getComponent("Size");
                    let vertices = createVerticesFromSize(pos, targetEntities[m].getComponent("Size").size);
                    e1['pos'] = {x: pos.x + size.x/2, y: pos.y + size.y/2} ;
                    e1['vertices'] = vertices;
                }

                if(targetEntities[n].hasComponent("Polygon")){
                    const {vertices} = targetEntities[n].getComponent("Polygon");
                    e2['vertices'] = vertices;
                    e2['pos'] = getCenterOfPoly(vertices);
                }else if(targetEntities[n].hasComponent("Size")){
                    let {pos} = targetEntities[n].getComponent("Position");
                    let {size} = targetEntities[n].getComponent("Size");
                    let vertices = createVerticesFromSize(pos, targetEntities[n].getComponent("Size").size);
                    e2['pos'] = {x: pos.x + size.x/2, y: pos.y + size.y/2}
                    e2['vertices'] = vertices;
                }
               
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

