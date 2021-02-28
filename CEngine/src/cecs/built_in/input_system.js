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
        //console.log(entity)
        const inputComponent = entity.getComponent('Inputs');
        inputComponent.inputs = this.inputs;
      })
      next();
    }

    handleEvent(event){
        console.log('its happening people', event)
    }
}

export default Input_System;