import System from '../system';
import {SAT} from "../../../libs/collision";
import {getCenterOfPoly, calculateResolutionVector} from "../../../libs/utils";
import Vector from '../../../libs/vectors';

class Collision_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "System_bounding_box"];
      this.excludeComponents = [];  
      this.tempObjectsForCollission = {
          obj1: {
            pos: {x: 0, y: 0},
            vertices: []
          },
          obj2: {
            pos: {x: 0, y: 0},
            vertices: []
          }
      },
      this.once = 0;
    }

    onCreate(){
        //this.subscribe('&assignCommand', (e, i)=>this.handleEvent(e, i));
    }

    clearTempObject(obj){
       obj.pos = {};
       obj.vertices = [];
    }

    update(dt){
        
        //for(let y = 0; y < this.cachedEntities.length; y++){
        for (const [i, fentity] of this.cachedEntities){
            
            //const fentity = this.cachedEntities[y];
            const ftransform = fentity.getComponent('Transform');
            const fHitBox = fentity.getComponent('System_bounding_box');
            
            // Maths 
            this.tempObjectsForCollission.obj1.vertices = this.createOffsetVertices(ftransform.pos, fHitBox.vertices);
            this.tempObjectsForCollission.obj1.pos = getCenterOfPoly(this.tempObjectsForCollission.obj1.vertices);
            
            //for(let x = 0; x < this.cachedEntities.length; x++)
            for (const [x, sentity] of this.cachedEntities)
            {
                // make sure we don't check against itself!
               if(x == i) continue;

               const stransform = sentity.getComponent('Transform');
               const sHitBox = sentity.getComponent('System_bounding_box');
               // Maths 2
               this.tempObjectsForCollission.obj2.vertices = this.createOffsetVertices(stransform.pos, sHitBox.vertices);
               this.tempObjectsForCollission.obj2.pos = getCenterOfPoly(this.tempObjectsForCollission.obj2.vertices);

               const collision = SAT(this.tempObjectsForCollission.obj2, this.tempObjectsForCollission.obj1);

            //    if(this.once < 1000 && collision){
            //     console.log(this.tempObjectsForCollission.obj2.pos)
            //     this.once += 1;
            // }
                // console.log(collision)
                if(collision){
                    let resolveVector = calculateResolutionVector(collision);
                    this.publish('&collisionEvent', {e1: fentity, e2: sentity, resolution: resolveVector});
                }   
                
                // if(this.once < 100 && collision){
                //     console.log(this.tempObjectsForCollission)
                //     this.once += 1;
                // }
                this.clearTempObject(this.tempObjectsForCollission.obj2)
            }
            
            this.clearTempObject(this.tempObjectsForCollission.obj1)
        }
    }

    handleEvent(event, {entity, data}){
        // const commandList = entity.components.get('CommandList');
        // commandList.push(data);
    }

    createOffsetVertices(position, vertices){
        //let calcPos = Vector.divide(position, 2)
        let v = [];
        //get the center of the boundy polygon
        let center =  getCenterOfPoly(vertices);
        let nDiff = Vector.subtract(position, center);

        for(let i = 0; i < vertices.length; i++){
            let newv = Vector.add(nDiff, vertices[i])
            v.push(newv);
        }

        return v;
    }
}

export default Collision_System;