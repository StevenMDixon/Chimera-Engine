import {System_Base, Vector} from 'GameLib';


class Physics_System extends System_Base {
    constructor(){
        super();
        this.targetComponents = ["Physics", "Position"];
    }

    update({deltaTime, entities}){
        entities.query(...this.targetComponents).forEach(e => {
            if(!e.hasComponent('Physics')) return 
            const {velocity, friction , acceleration, mass} = e.getComponent("Physics");
            const {pos} = e.getComponent("Position");
            
            velocity.add(acceleration.multiply(deltaTime/100));
           
            pos.add(new Vector(velocity.x, velocity.y));
            //pos.set({x: Math.floor(pos.x), y: Math.floor(pos.y)})
            if(e.hasComponent('Gravity')){
                velocity.add(e.getComponent("Gravity").gravity)
            }

            //pos.set({x: round(pos.x), y: round(pos.y)})
            velocity.set(new Vector(
                velocity.x * friction.x, 
                velocity.y * friction.y
            ));

            acceleration.set(new Vector(0,0));
        })
    }
}

export default Physics_System;

function round(number){
    return Math.round(number);
}