
import Chimera from 'ChimeraEngine';
import {Vector} from 'ChimeraEngine';

class HandlePlayerCollides extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = [];
        this.excludeComponents = [];
        this.once = 0
    }

    onCreate(){
        this.subscribe('&collisionEvent', (e, i)=> this.handleEvent(i));
    }

    update(h,dt){
        
    }

    handleEvent(data){
        const {e1, e2, resolution} = data;

        
        console.log(e1, e2, resolution)
        if(e1.hasComponents(['Player', 'Physics'])){
            const {velocity} = e1.components.get('Physics');
            const {pos} = e1.components.get('Transform');
            this.publish('&updatedebug', {vx: velocity.x, vy: velocity.y, resx: resolution.x, resy: resolution.y});
            pos.subtract(resolution);
            velocity.set(new Vector(0,0));
        }
       
        //console.log(e1)
        
        //console.log(player1, resolution)
        // if(e1.hasComponents('Player')){
        //     const {velocity} = e1.componts.get('Physics');
        //     console.log(resolutionVector)
        //     velocity.add(resolutionVector);
        // }

        // if(e2.hasComponents('Player')){
        //     const {velocity} = e2.compoents.get('Physics');
        //     console.log(resolutionVector)
        //     velocity.add(resolutionVector);
        // }
        //console.log('playerCollided')
        // const transform = entity.components.get('Transform');
        // transform.y -= 2  * (data/100);
    }
}

export default HandlePlayerCollides;