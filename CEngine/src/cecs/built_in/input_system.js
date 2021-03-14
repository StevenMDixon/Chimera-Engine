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
        entity.getComponent('Inputs').inputs = this._inputs;
      }
      next();
    }

    handleEvent(event, inputs){
        this._inputs = inputs;
    }
}

export default Input_System;