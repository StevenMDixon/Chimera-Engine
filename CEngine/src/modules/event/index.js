import EventContext from './eventContext';
import {_engineEvents} from './engineEvents';

class EventManager {
    constructor(){
        this.eventHandlers = new Map();
        this.subscribers = {};
    }
    
    createEventHandler(name){
        // create a new event handler
        const handler = new EventContext();
        // register items deemed as system messages
        _engineEvents.forEach(eventName =>{
            handler.subscribe(eventName, this.handleSystemMessages.bind(this))
        })
        // add new handler to map
        this.eventHandlers.set(name, handler);
        return handler;
    }

    handleSystemMessages(message, payload){
        // @todo add in handling for event messages
        // console.log(message)
        this.publish(message, payload);
    }

    publishEventtoChild(event, payload, childName){
        const h = this.eventHandlers.get(childName);
        h.publishImmediate(event, payload);
    }

    subscribe(event, fn){
        if(this.subscribers[event]){
            this.subscribers[event].push(fn);
        }else{
            this.subscribers[event] = [fn];
        }
    }

    publish(event, payload){
        if(this.subscribers[event]){
            this.subscribers[event].forEach(subscriber => {
                subscriber(payload);
            })
        }
    }

    finalize(name){
        this.eventHandlers.get(name).finalize();
    }
}

export default new EventManager();