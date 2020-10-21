import {System_Base, Event} from 'GameLib';


class Collision_Resolver_System extends System_Base {
    constructor(){
        super();
        this.targetComponents = [];
    }

    init(){
        Event.subscribe('collision', (data)=>this.handle(data));
    }

    update({deltaTime, entities}){
        //console.log(entities)
    }

    handle({e1, e2, resolution, gameObject}){

        if(e1.hasComponent('Movable', 'Physics') && e2.hasComponent('Solid')){
            let {pos} = e1.getComponent("Position");
            let {velocity} = e1.getComponent("Physics");

        
            if (e1.hasComponent('Collectible') && e2.hasComponent('Player')){
                if(e1.hasComponent('Trigger')){
                    let {event, data} = e1.getComponent('Trigger');
                    Event.publish(event, {data, gameObject})
                }
                gameObject.removeGameObject(e1);
            }else if(e2.hasComponent('Collectible') && e1.hasComponent('Player')) {
                if(e2.hasComponent('Trigger')){
                    let {event, data} = e2.getComponent('Trigger');
                    Event.publish(event, {data, gameObject})
                }
                gameObject.removeGameObject(e2);
            }
        
        //@Todo bounce on axis
        //if(e1.hasComponent('Bounce')){
            // let inverse = new Vector(Math.sign(collision.MTVAxis.x), Math.sign(collision.MTVAxis.y))
            // let bounce = targetEntities[n].getComponent("Bounce").bounce
            // //targetEntities[n].getComponent("Physics").velocity.negate().multiply(bounce);
            // inverse.multiply(bounce);
            // console.log(inverse);
            // velocity.add(inverse)
            // velocity.negate()
        //}
        
        pos.subtract(resolution);
        velocity.subtract(resolution);
        
    }
}
}

export default Collision_Resolver_System;
