class Event {
    constructor() {
        this.subscribers = {};
        this.q = [];
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
                this.q.push(()=>subscriber(payload));
            })
        }
    }

    publishImmediate(event, payload){
        if(this.subscribers[event]){
            this.subscribers[event].forEach(subscriber => {
                subscriber(payload);
            })
        }
    }

    finalize(){
        let t = [...this.q];
        if(t.length == 0) return;
        t.forEach(fn => fn());
        this.q = this.q.slice(t.length, this.q.length)
    }
}


export default Event;
