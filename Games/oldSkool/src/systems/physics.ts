import {System_Base, Vector} from 'GameLib';


class Physics_System extends System_Base {
    constructor(){
        super();
        this.targetComponents = ["Physics", "Position"];
    }

    update(deltaTime, entities){
        entities.forEach(e => {


            const {velocity, friction , acceleration, mass} = e.getComponent("Physics");
            const {pos} = e.getComponent("Position");
            
            velocity.add(acceleration.multiply(deltaTime/100));
           

            pos.add(new Vector(velocity.x, velocity.y));
            
            if(e.hasComponent('Gravity')){
                velocity.add(e.getComponent("Gravity").gravity)
            }
                

            velocity.set(new Vector(
                velocity.x * friction.x, 
                velocity.y * friction.y
                ));
            console.log(velocity)
            acceleration.set(new Vector(0,0));
        })
    }
}

export default Physics_System;