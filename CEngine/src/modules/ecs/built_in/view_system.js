import System from '../system';
import Vector from '../../../libs/vectors';

class View_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Veiwable"];
      this.excludeComponents = [];
      this.once = 0;
    }
    update(next, dt){
        if(this.once < 100){
           /// console.log(this._sceneContext.stage)
            //console.log(this._sceneContext.global.renderer.renderer.screen)
            this.once++;
        }

      for(const [i, entity] of this.cachedEntities){
            //this._sceneContext.stage
      }
    }
    
}

export default View_System;