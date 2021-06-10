import {Vector, systemTemplate} from 'ChimeraEngine';

class MovementSystem extends systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["Inputs", "Player", "Transform", "Physics"];
        this.excludeComponents = [];
    }

    update(h,dt){
        for(const [i, item] of this.cachedEntities){
            let {inputs} = item.components.get('Inputs');
            const transform = item.components.get('Transform');
            const state = item.components.get('State');
            const {acceleration} = item.components.get('Physics');

            const movementVector = new Vector(0,0);
            if(inputs[38]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(0,-3))
                //transform.y -= 2 * (dt/100);
            }
            if(inputs[39]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(3,0))
                //transform.x += 2 * (dt/100);
            }
            if(inputs[37]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(-3,0))
                //transform.x -= 2 * (dt/100);
            }
            if(inputs[40]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(0,3))
                //transform.y += 2 * (dt/100);
            }
            if(!inputs[38] && !inputs[40] && !inputs[39] && !inputs[37]){
                state.previousState = state.currentState;
                state.currentState = 'idle'
            }
            if(inputs[90]){
                transform.scale.x += 1;
                transform.scale.y += 1;
            }
            if(inputs[88]){
                transform.scale.y -= 1;
                transform.scale.x -= 1;
            }
            if(acceleration){
                acceleration.add(movementVector);
            } else {
                //transform.pos.add(movementVector);
            }
            
        }
    }
}

export default MovementSystem;