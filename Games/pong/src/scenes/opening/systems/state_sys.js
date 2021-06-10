
import Chimera from 'ChimeraEngine';

class StateSystem extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["State", "PixiAnimations", "Pixi", 'Player'];
        this.excludeComponents = [];
    }

    update(next, dt){
        for(const [i, item] of this.cachedEntities){
            const state = item.components.get('State');
            const {pixi} = item.components.get('Pixi');
            const {animations} = item.components.get('PixiAnimations');

            if(state.currentState == 'idle' && state.previousState != 'idle'){
               //if(pixi.currentFrame == pixi.totalFrames){
                    pixi.textures = animations.one;
                //}
            }else if(state.currentState == 'walking' && state.previousState != 'walking'){
               // if(pixi.currentFrame == pixi.totalFrames){
                    pixi.textures = animations.two;
               // }
            }

            
            if(pixi.currentFrame == (pixi.totalFrames -1)){
             //   pixi.currentFrame = 0
            }
            pixi.update(dt/100);
            
        }
    }
}

export default StateSystem;