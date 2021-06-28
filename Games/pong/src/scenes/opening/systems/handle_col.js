
import Chimera from 'ChimeraEngine';
import {Vector, Collision, utils} from 'ChimeraEngine';

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

    updateVertices(pos, HitBox){
        //get the center of the boundy polygon
        let center = Chimera.utils.getCenterOfPoly(HitBox.vertices);

        let nDiff = Vector.subtract(pos, center);
       // console.log(nDiff)
        for(let i = 0; i < HitBox.vertices.length; i++){
            HitBox.vertices[i] =  Vector.add(HitBox.vertices[i], nDiff);
        }
        HitBox.position = Chimera.utils.getCenterOfPoly(HitBox.vertices);
    }

    handleEvent(data){
        const {entity, collisionData} = data;
        const {force, velocity} = entity.components.get('Physics');
        const {pos} = entity.components.get('Transform');

        // sort collissions based on criteria of largest overlap first
        const sortedCollisions = collisionData.sort((collision1, collision2) => {
            let [e1, d1, c1] = collision1;
            let [e2, d2, c2] = collision2;
           // console.log(d1, d2)
            if((c1.overlap <= c2.overlap) ) return 1;
            else if(c1.overlap > c2.overlap) return -1;
            //return 0;
        });

        console.log('sorted', sortedCollisions)

        // move through collisions resolving only those that are still colliding.
        for(const collision of sortedCollisions){
            const [e, d, c] = collision;
            let body = utils.convertToCollidable(entity);
            let col = Chimera.Collision.SAT(body, c.body2);
           
            if(col){
                pos.add(c.penetration);
            }//else continue;
        }
    }
}

export default HandlePlayerCollides;