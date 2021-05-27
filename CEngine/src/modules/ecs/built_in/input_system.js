import System from '../system';

class Input_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Inputs"];
      this.excludeComponents = [];
      this._inputs = {};  
    }

    onCreate(){
        this.subscribe('&inputs_updated', (e, i)=>this.handleEvent(e, i));
    }

    update(next, dt){
      for(const [i, entity] of this.cachedEntities){
        let InputData = entity.getComponent('Inputs');
        if(InputData.enabled == true){
          InputData.inputs = this._inputs;
        }
      }
    }

    handleEvent(event, inputs){
        this._inputs = inputs;
    }
}

export default Input_System;