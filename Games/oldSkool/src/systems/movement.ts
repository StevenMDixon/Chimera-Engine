import {System_Base, Vector} from 'GameLib';


class Movement_System extends System_Base {
    constructor(){
        super();
        this.targetComponents = ["Movable", "Inputs"];
    }

    update({deltaTime, entities}){
        //console.log(entities)
        entities.query(...this.targetComponents).forEach(e => {
            if(e.hasComponent("Player", "Position")){
                //if(e.getComponent("Inputs").inputs.length > 0)
                const {inputs} = e.getComponent("Inputs");
                const {state} = e.getComponent("State");
                const newVec = new Vector(0, 0);

                if(inputs[38] === true){
                   newVec.add(new Vector(0, -1))
                }
                if(inputs[40] === true){
                    newVec.add(new Vector(0, 1));
                }
                if(inputs[39] === true){
                    newVec.add(new Vector(1, 0))
                }
                if(inputs[37] === true){
                    newVec.add(new Vector(-1, 0))
                }
                if(!inputs[37] && !inputs[38] && !inputs[39] && !inputs[40]){
                    if(state){
                       e.getComponent("State").state = 'idle'
                    }
                }
                if(e.hasComponent("Physics")){
                    e.getComponent("Physics").acceleration.add(newVec);
                }else {
                    e.getComponent("Position").pos.add(newVec)
                }

                if(newVec.y < 0){
                    e.getComponent("State").state = 'walk-up'
                }
                else if( newVec.y > 0 ){
                    e.getComponent("State").state = 'walk'
                }else if( newVec.x != 0){
                    e.getComponent("State").state = 'walk'
                }
            }
        })
    }
}

export default Movement_System;