
import System from '../system';
import {SAT} from "../../../libs/collision";
import {getCenterOfPoly, rotateVertice, convertToCollidable, mapVertices} from "../../../libs/utils";


class Collision_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "System_bounding_box"];
      this.excludeComponents = [];  
      this.once = 0;
      this.collisions = new Map();
    }

    update(h, dt){
        for(const [id1, entity1] of this.cachedEntities){
        if(!entity1.hasComponents(['Movable'])) continue;
        const e1 =  convertToCollidable(entity1);
        const collisions = entity1.components.get('System_Collisions')
        for(const [id2, entity2] of this.cachedEntities){
            if(id1 == id2) continue;
            // let {Transform: t2, System_bounding_box: b2} = entity2.getComponents('Transform', 'System_bounding_box');
            //const e2 = mapVertices(t2, b2.vertices)//
            const e2 = convertToCollidable(entity2);
            const collision = SAT(e1, e2);
            const diff = 0//Math.hypot(e2.pos.x - e1.pos.x, e2.pos.y - e1.pos.y);

            if(collision){
                this.addCollision(entity1, [entity2, diff, collision]);
            }
        }
        // reset collision data for moving objects if no collisions occured.
        if(!this.collisions.has(entity1)){
            collisions.left = 0;
            collisions.right = 0;
            collisions.top = 0;
            collisions.bottom = 0;
        }

        this.publishCollision();
        }
    }


    addCollision(entity, collisionData){
        if(this.collisions.has(entity)){
            let currentCollision = this.collisions.get(entity);

            let letAddCollision = true;
            let insertIndex = 0;
            let [e1, d2, col1] = collisionData;
            
            if(currentCollision.length != 0){
                //filter out duplicated collisions
                for(let i = 0; i < currentCollision.length; i++){
                    const [e2, d2, col2] = currentCollision[i];
                    if(col1.overlap == col2.overlap && 
                        col1.mtvaxis.y == col2.mtvaxis.y && 
                        col1.mtvaxis.x == col2.mtvaxis.x){
                        letAddCollision = false;
                    }else {
                        // sort collissions
                        if(col1.overlap <= col2.overlap) insertIndex = i+1;
                    }

                }
            }

            if(letAddCollision){
                currentCollision.splice(insertIndex, 0, collisionData);
            }
        }else {
            this.collisions.set(entity, [collisionData])
        }
    }

    publishCollision(){
        for( const [entity, collisionData] of this.collisions){
            this.publishImmediate('&collisionEvent', {entity, collisionData});
        }
        this.collisions.clear();
    }
}



export default Collision_System;