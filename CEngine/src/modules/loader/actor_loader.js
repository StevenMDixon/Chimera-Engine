import {components} from '../ecs';
import Vector from '../../libs/vectors';
import {createVertices, createVerticesFromSize} from '../../libs/utils';

class ActorLoader {
    constructor(parent){
        this.parent = parent;
        this._actors = new Map();
    }

    get list(){
        return Object.fromEntries(this._actors);
    }

    load(actorList, fn){
        if(!actorList) return;
        for(const actor of actorList){
           let composedComponents =  this._createActor(actor, fn);
           let composedActor = this.parent.world.composeEntity(composedComponents);
           this._actors.set(actor.name, composedActor);
        }
    }

    // what is an actor? but a miserable collection of components.
    _createActor(actorData, userFN){
       let actor = [];
       const availableComponents = components.getComponents();
       const {name, tags, components: componentList, transform} = actorData;

       //check for transform
       if(transform){
           const {position, size, scale, rotation} = transform;
           actor.push(new availableComponents['Transform'](
               new Vector(position.x, position.y),
                rotation || 0, 
                new Vector(scale.x || 1, scale.y || 1),
                new Vector(size.h, size.w)
                ),
                
            );

           if(componentList && !componentList.System_bounding_box){
                let vertices = createVerticesFromSize(0, 0, size.w, size.h);
                actor.push(new availableComponents['System_bounding_box'](vertices));
            } 
       }

       // check for tag components and add them
       if(tags){
           for(const tag of tags){
                if(availableComponents[tag]){
                    actor.push(new availableComponents[tag]());
                }
           }
       }

       if (componentList){
           for(const componentName in componentList){
               if(Array.isArray(componentList[componentName])) {
                    actor.push(new availableComponents[componentName](...componentList[componentName]));
               } else {
                    actor.push(new availableComponents[componentName](componentList[componentName]));
               }
           }
       }

       // add built-in components
       actor.push(new availableComponents.Commands());

       // allow for user defined functions like pixi related animations
       if(userFN) {
        for(const fn of userFN){
            actor.push(...fn(actorData));
        }
       }
       
       return actor;
    }

    getActor(actorName){
        return this._actors.get(actorName);
    }
}




export default ActorLoader;