import {Vector, systemTemplate} from 'ChimeraEngine';

class MovementSystem extends systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["Inputs", "Player", "Transform", "Physics"];
        this.excludeComponents = [];
        this.timer = 0;
    }

    update(h,dt){
        for(const [i, item] of this.cachedEntities){
            let {inputs} = item.components.get('Inputs');
            const transform = item.components.get('Transform');
            const state = item.components.get('State');
            const {force} = item.components.get('Physics');
            const Collissions = item.components.get('System_Collisions');

            const movememtStatic = .01;
            
            const movementVector = new Vector(0,0);
            if(inputs[38]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(0,-movememtStatic))
            }
            if(inputs[39]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(movememtStatic,0))
            }
            if(inputs[37]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(-movememtStatic,0))
            }
            if(inputs[40]){
                state.previousState = state.currentState;
                state.currentState = 'walking'
                movementVector.add(new Vector(0,movememtStatic))
            }

            
            
            if(inputs[32] && Collissions.bottom && this.timer > 500){
                movementVector.add(new Vector(0,-2))
                this.timer = 0;
            }
            if(!inputs[38] && !inputs[40] && !inputs[39] && !inputs[37] && !inputs[32] ){
                state.previousState = state.currentState;
                state.currentState = 'idle'
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
                force.set(movementVector);
            } else {
                //transform.pos.add(movementVector);
            }

            this.timer += dt;
            
        }
    }
}

export default MovementSystem;