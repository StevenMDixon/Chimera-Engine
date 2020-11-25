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
       
        t.forEach(fn => fn());
       // console.log(this.q)
        this.q = this.q.slice(t.length, this.q.length)
    }
}

const instance = new Event();
Object.freeze(instance);

export default instance;
