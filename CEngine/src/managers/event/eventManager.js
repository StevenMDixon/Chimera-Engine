import EventHander from './eventHandler';

const _engineEvents = [
    '&sys_error',
    '&sys_message'
]

class EventManager {
    constructor(){
        this.eventHandlers = new Map();
    }
    
    createEventHandler(name){
        // create a new event handler
        const handler = new EventHander();
        // register items deemed as system messages
        _engineEvents.forEach(eventName =>{
            handler.subscribe(eventName, this.handleSystemMessages.bind(this))
        })
        // add new handler to map
        this.eventHandlers.set(name, handler);
        return handler;
    }

    handleSystemMessages(message){
        //@todo add in handling for event messages
        console.log(message)
    }

    publishEventtoChild(event, payload, childName){
        let h = this.eventHandlers.get(childName);
        h.publish(event, payload);
    }
}

export default new EventManager();