
import Chimera from 'ChimeraEngine';
import {Vector, Collision, utils} from 'ChimeraEngine';
import collision from 'ChimeraEngine/src/libs/collision';

class HandlePlayerCollides extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = [];
        this.excludeComponents = [];
        this.once = 0;
    }

    onCreate(){
        this.subscribe('&collisionEvent', (e, i)=> this.handleEvent(i));
    }

    update(h,dt){
        return;
    }

    handleEvent(data){
        const {entity, collisionData} = data;
        //const {force, velocity} = entity.components.get('Physics');
        const {pos} = entity.components.get('Transform');
        const collisions = entity.components.get('System_Collisions');
        // move through collisions resolving only those that are still colliding.
        let collidedSides = {top: 0, left: 0, bottom: 0, right: 0}

        for(let i = 0; i < collisionData.length; i++)
        {
            const [e, d, c] = collisionData[i];
            let body = utils.convertToCollidable(entity);
            let col = Chimera.Collision.SAT(body, c.body2);
            if(col){
                pos.add(c.penetration);
                //console.log(c)
                if(this.once < 100){
                    console.log(c)
                    console.log(collidedSides)
                    this.once++;
                }
               if (c.mtvaxis.x > 0){
                   collidedSides.left = 1;
               }if (c.mtvaxis.x < 0){
                   collidedSides.right = 1;
               }if (c.mtvaxis.y < 0){
                    collidedSides.bottom = 1;
               }if (c.mtvaxis.y > 0){
                    collidedSides.top = 1;
               }
            }
        }

        //collisions = {...collidedSides};
        collisions.left = collidedSides.left;
        collisions.right = collidedSides.right;
        collisions.top = collidedSides.top;
        collisions.bottom = collidedSides.bottom;
    }
}

export default HandlePlayerCollides;