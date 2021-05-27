
import Chimera from 'ChimeraEngine';

class PlayerCollides extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["Player", "Transform"];
        this.excludeComponents = [];
    }

    update(h,dt){
        for(const [i, item] of this.cachedEntities){
            const transform = item.components.get('Transform');

            if(transform.y > 100){
                //console.log('test')
                //this.publish('_playerCollided', {entity: item, data: dt})
                //this.publish('&assignCommand', {entity: item, data: {name: 'walkUp', blocking: 1,  loop: 1, data: [0,0]}})
            }
        }
    }
}

export default PlayerCollides;