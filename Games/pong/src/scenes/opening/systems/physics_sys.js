
import Chimera from 'ChimeraEngine';
import {Vector} from 'ChimeraEngine'

class Physics extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ['Physics'];
        this.excludeComponents = [];
    }
 
    onCreate(){
        console.log(this._sceneContext.stage)
        return
    }

    update(h, dt){
        for(const [i, item] of this.cachedEntities){
            const {pos} = item.components.get('Transform');
            const {velocity, force, friction, gravity} = item.components.get('Physics');
            const collisions = item.components.get('System_Collisions');
            const Platformer_Physics = item.components.get('Platformer_Physics');

            let tGravity = gravity || .01 ;

            if (!collisions.bottom){
                force.add(new Vector(0, tGravity));
            }
            
            if(!collisions.bottom && velocity.y < 0){
                force.add(new Vector(0, 1 * tGravity * (Platformer_Physics.up -1)));
            }
            
            if (!collisions.bottom && velocity.y > 0){
                //force.add(new Vector(0, 1 * tGravity * (Platformer_Physics.float - 1)) );
            }
            
            velocity.add(new Vector(force.x * dt, force.y * dt));

            velocity.subtract(Vector.multiply(velocity, friction).multiply(dt));

            pos.add(new Vector(velocity.x * dt, velocity.y * dt));
            
            //force.multiply(0);
        }
    }

    // handleEvent({entity, data}){
    // }
}

export default Physics;