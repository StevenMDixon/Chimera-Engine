
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

    update(h,dt){
        for(const [i, item] of this.cachedEntities){
            const transform = item.components.get('Transform');
            const {velocity, acceleration, friction} = item.components.get('Physics');

            velocity.add(Vector.multiplybyInt(acceleration, (dt/100)));

            transform.pos.add(new Vector(velocity.x, velocity.y));
            //pos.set({x: Math.floor(pos.x), y: Math.floor(pos.y)})
            // if(e.hasComponent('Gravity')){
            //     velocity.add(e.getComponent("Gravity").gravity)
            // }

            //pos.set({x: round(pos.x), y: round(pos.y)})
            velocity.set(new Vector(
                velocity.x * .1, 
                velocity.y * .1
            ));

            acceleration.set(new Vector(0,0));
        }
    }

    handleEvent({entity, data}){
    }
}

export default Physics;