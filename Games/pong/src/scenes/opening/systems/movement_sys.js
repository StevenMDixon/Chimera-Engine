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
            const {force} = item.components.get('Physics');
            
            const movementVector = new Vector(0,0);
            if(inputs[38]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(0,-.01))
                //transform.y -= 2 * (dt/100);
            }
            if(inputs[39]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(.01,0))
                //transform.x += 2 * (dt/100);
            }
            if(inputs[37]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(-.01,0))
                //transform.x -= 2 * (dt/100);
            }
            if(inputs[40]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(0,.01))
                //transform.y += 2 * (dt/100);
            }
            
            if(inputs[32]){
                movementVector.add(new Vector(0,-.08))
            }
            if(!inputs[38] && !inputs[40] && !inputs[39] && !inputs[37] && !inputs[32] ){
                state.previousState = state.currentState;
                state.currentState = 'idle'
                //movementVector.set(new Vector(0,0))
            }
            if(inputs[90]){
                // transform.scale.x += 1;
                // transform.scale.y += 1;
                transform.rotation += .01;
            }
            if(inputs[88]){
                // transform.scale.y -= 1;
                // transform.scale.x -= 1;
                transform.rotation = 0;
            }
            if(force){
                force.add(movementVector);
            } else {
                //transform.pos.add(movementVector);
            }
            
        }
    }
}

export default MovementSystem;