
import Chimera from 'ChimeraEngine';

class MovementSystem extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["Inputs", "Player", "Transform"];
        this.excludeComponents = [];
    }

    update(next, dt){
       // console.log(this.cachedEntities)
        this.cachedEntities.forEach(item =>{
            let {inputs} = item.components.get('Inputs');
            const transform = item.components.get('Transform');
            const state = item.components.get('State');

            if(inputs[87]){
                state.currentState = 'walking'
                transform.y -= 1;
            }
            if(inputs[68]){
                state.currentState = 'walking'
                transform.x += 1;
            }
            if(inputs[65]){
                state.currentState = 'walking'
                transform.x -= 1;
            }
            if(inputs[83]){
                state.currentState = 'walking'
                transform.y += 1;
            }
            if(inputs[90]){
                transform.scale.x += 1;
                transform.scale.y += 1;
            }
            if(inputs[88]){
                transform.scale.y -= 1;
                transform.scale.x -= 1;
            }
        })

        next();
    }
}

export default MovementSystem;