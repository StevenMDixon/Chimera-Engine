
import Chimera from 'ChimeraEngine';

class MovementSystem extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["Inputs", "Player", "Transform"];
        this.excludeComponents = [];
    }

    update(next, dt){
        this.cachedEntities.forEach(item =>{
            const {inputs} = item.components.get('Inputs');
            const transform = item.components.get('Transform')
            //console.log(inputs);
            if(inputs[87]){
                console.log((dt))
                transform.y -= 1;
            }
            if(inputs[68]){
                transform.x += 1;
            }
            if(inputs[65]){
                transform.x -= 1;
            }
            if(inputs[83]){
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