
import Chimera from 'ChimeraEngine';

class StateSystem extends Chimera.systemTemplate{
    constructor(e){
        super();
        this.targetComponents = ["State", "PixiAnimations", "Pixi"];
        this.excludeComponents = [];
    }

    update(next, dt){
        for(const [i, item] of this.cachedEntities){
            const state = item.components.get('State');
            const {pixi} = item.components.get('Pixi');
            const {animations} = item.components.get('PixiAnimations');

            if(state.currentState == 'idle'){
                if(!pixi.playing){
                    pixi.textures = animations.one;
                    pixi.play();
                }
            }else {
                if(!pixi.playing){
                    pixi.textures = animations.two;
                    pixi.play();
                }
            }
        }
    }
}

export default StateSystem;