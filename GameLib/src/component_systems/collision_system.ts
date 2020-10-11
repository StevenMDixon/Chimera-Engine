import System_Base from './system_base';
import {SAT} from '../modules/collider'
import {getCenterOfPoly, createVerticesFromSize} from '../modules/utils';
import { Vector } from '..';

class Collision_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['Solid', 'Position'];
        this.order = 98;
    }

    init(){
         
    }

    update(deltaTime, enities){
        // May need to filter static entities vs entities that are moving
        // check vs static then check vs other?
        for (let m = 0; m < enities.length; m++){
            for (let n = m + 1; n < enities.length; n++)
            {
                let e1 = {};
                let e2 = {};

                if(enities[m].hasComponent("Polygon")){
                    const {vertices} = enities[m].getComponent("Polygon");
                    e1['vertices'] = vertices;
                    e1['pos'] = getCenterOfPoly(vertices);
                }else if(enities[m].hasComponent("Size")){
                    let {pos} = enities[m].getComponent("Position");
                    let {size} = enities[m].getComponent("Size");
                    let vertices = createVerticesFromSize(pos, enities[m].getComponent("Size").size);
                    e1['pos'] = {x: pos.x + size.x/2, y: pos.y + size.y/2} ;
                    e1['vertices'] = vertices;
                }

                if(enities[n].hasComponent("Polygon")){
                    const {vertices} = enities[n].getComponent("Polygon");
                    e2['vertices'] = vertices;
                    e2['pos'] = getCenterOfPoly(vertices);
                }else if(enities[n].hasComponent("Size")){
                    let {pos} = enities[n].getComponent("Position");
                    let {size} = enities[n].getComponent("Size");
                    let vertices = createVerticesFromSize(pos, enities[n].getComponent("Size").size);
                    e2['pos'] = {x: pos.x + size.x/2, y: pos.y + size.y/2}
                    e2['vertices'] = vertices;
                }
               
               
                if(enities[n].hasComponent('Movable', 'Physics')){
                        let collision = SAT(e1, e2);
                        if(collision){
                            let {pos} = enities[n].getComponent("Position")
                            let resolveVector = Vector.multiply(collision.MTVAxis, {x: collision.smallestOverlap, y: collision.smallestOverlap})

                            // if(enities[n].hasComponent('Bounce')){
                            //     let bounce = enities[n].getComponent("Bounce").bounce
                            //     enities[n].getComponent("Physics").velocity.negate().multiply(bounce);
                            // }

                            pos.subtract(resolveVector);

                        }
                }   
            }
        }
    }
}

export default Collision_System;