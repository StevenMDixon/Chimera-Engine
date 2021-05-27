import System from '../system';

class Command_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Commands"];
      this.excludeComponents = [];  
    }

    onCreate(){
        this.subscribe('&assignCommand', (e, i)=>this.handleEvent(e, i));
    }

    update(dt){
        return;
    }

    handleEvent(event, {entity, data}){
        const commandList = entity.components.get('CommandList');
        commandList.push(data);
    }
}

export default Command_System;