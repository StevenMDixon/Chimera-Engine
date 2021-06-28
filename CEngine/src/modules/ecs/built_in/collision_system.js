
import System from '../system';
import {SAT} from "../../../libs/collision";
import {getCenterOfPoly, rotateVertice, convertToCollidable} from "../../../libs/utils";
import Vector from '../../../libs/vectors';


class Collision_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "System_bounding_box"];
      this.excludeComponents = [];  
      this.once = 0;
      this.collisions = new Map();
    }

    // e1: -- , collissions: []

    update(h, dt){
        const items = Array.from(this.cachedEntities, ([name, value]) => (value));

        for(let k = 0; k < items.length; k++){
            const movable = items[k].components.get('Movable');
            if(!movable) continue;
            
            for(let l = 0; l < items.length; l++){
                if(k == l) continue;
                const e1 = convertToCollidable(items[k]);
                const e2 = convertToCollidable(items[l]);

                const collision = SAT(e1, e2);
                const diff = Math.hypot(e2.pos.x - e1.pos.x, e2.pos.y - e1.pos.y);

                if(collision){
                    this.addCollision(items[k], [items[l], diff, collision]);
                }

            }
            this.publishCollision();
        }
    }


    addCollision(entity, collisionData){
       
        //this.collisions.set()
        if(this.collisions.has(entity)){
            let currentCollision = this.collisions.get(entity);
            let letAddCollision = true;
            let [e1, d2, col1] = collisionData;
            for(const collisions of currentCollision){
                 const [e2, d2, col2] = collisions;
                 if(col1.overlap == col2.overlap && col1.mtvaxis.y == col2.mtvaxis.y && col1.mtvaxis.x == col2.mtvaxis.x){
                     letAddCollision = false;
                 }
            }
            if(letAddCollision){
                this.collisions.set(entity, [...currentCollision, collisionData]);
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

    // convertToCollidable(entity){
    //     const {position, vertices, center} = entity.components.get('System_bounding_box');
    //     const Transform = entity.components.get('Transform');
    //     return this.mapVertices(Transform, vertices);
    // }

    // mapVertices(transform, vertices){
    //     const results = [];
    //     const npos = new Vector(0,0);
    //     const {pos: position , rotation, size, scale} = transform;
    //     // @Todo implement scaling...
    //     // Update each vertex from the center of the object to the correct offset
    //     for (const vertex of vertices){
    //         results.push(Vector.add(position, vertex));
    //     }
        
    //     // handle rotation only if the object is rotated
    //     if(rotation != 0){
    //         // get difference in objects current pos and center of translated polygon divide by two to get offset.
    //         let center = Vector.add(position, Vector.divide(size, 2));
    //         results.forEach(vertex => {
    //             let t = rotateVertice(center, vertex, rotation);
    //             vertex.set(t);
    //         })
    //     }
        
    //     // get the collission boxes center only after translation and rotation and scaling
    //     npos.set(getCenterOfPoly(results));
        
    //     return {pos: npos, vertices: results};
    // }
}



export default Collision_System;