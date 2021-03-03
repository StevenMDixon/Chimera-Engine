import System from '../system';

class Input_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Inputs"];
      this.excludeComponents = [];
      this._inputs = {};  
    }

    onCreate(){
        this.subscribe('&inputs_updated', (e)=>this.handleEvent(e));
    }

    update(next, dt){
      this.cachedEntities.forEach((entity) => {
        const inputComponent = entity.getComponent('Inputs');
        inputComponent.inputs = this._inputs;
      })
      next();
    }

    handleEvent(inputs){
        //console.log(inputs)
        this._inputs = inputs;
    }
}

export default Input_System;