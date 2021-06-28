
import Chimera from 'ChimeraEngine';
import {Vector} from 'ChimeraEngine'

class Physics extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ['Physics'];
        this.excludeComponents = [];
    }
 
    onCreate(){
        return
    }

    update(h, dt){
        for(const [i, item] of this.cachedEntities){
            const {pos} = item.components.get('Transform');
            const {velocity, force, friction, gravity} = item.components.get('Physics');
            
            force.add(new Vector(0, gravity || .001));
            
            velocity.add(new Vector(force.x * dt, force.y * dt));

            pos.add(new Vector(velocity.x * dt, velocity.y * dt));

            velocity.set(Vector.multiply(velocity, friction));
            
            force.multiply(0);
        }
    }

    handleEvent({entity, data}){
    }
}

export default Physics;