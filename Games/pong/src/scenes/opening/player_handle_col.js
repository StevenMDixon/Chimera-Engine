
import Chimera from 'ChimeraEngine';

class HandlePlayerCollides extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["Player", "Transform"];
        this.excludeComponents = [];
    }

    onCreate(){
        this.subscribe('_playerCollided', (e, i)=>this.handleEvent(i));
    }

    update(h,dt){
        
    }

    handleEvent({entity, data}){
        console.log('playerCollided')
        const transform = entity.components.get('Transform');
        transform.y -= 2  * (data/100);
    }
}

export default HandlePlayerCollides;