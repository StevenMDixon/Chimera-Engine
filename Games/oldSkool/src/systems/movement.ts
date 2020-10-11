import {System_Base, Vector} from 'GameLib';


class Movement_System extends System_Base {
    constructor(){
        super();
        this.targetComponents = ["Movable", "Inputs"];
    }

    update(deltaTime, entities){
        //console.log(entities)
        entities.forEach(e => {
            if(e.hasComponent("Player", "Position")){
                //if(e.getComponent("Inputs").inputs.length > 0)
                const {inputs} = e.getComponent("Inputs");
                const newVec = new Vector(0, 0);

                if(inputs[38] === true){
                   newVec.add(new Vector(0, -1.5))
                }
                if(inputs[40] === true){
                    newVec.add(new Vector(0, 1.5))
                }
                if(inputs[39] === true){
                    newVec.add(new Vector(1.5, 0))
                }
                if(inputs[37] === true){
                    newVec.add(new Vector(-1.5, 0))
                }
                if(e.hasComponent("Physics")){
                    e.getComponent("Physics").acceleration.add(newVec);
                }else {
                    e.getComponent("Position").pos.add(newVec)
                }
            }
        })
    }
}

export default Movement_System;