class Event_Core {
    private subscribers: any;
    private q: any;
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

    publish(event, payload?){
        if(this.subscribers[event]){
            this.subscribers[event].forEach(subscriber => {
                this.q.push(()=>subscriber(payload));
            })
        }
    }

    publishImmediate(event, payload?){
        if(this.subscribers[event]){
            this.subscribers[event].forEach(subscriber => {
                subscriber(payload);
            })
        }
    }

    finalize(){
        let t = [...this.q]
       

        t.forEach(fn => fn());
       // console.log(this.q)
        this.q = this.q.slice(t.length, this.q.length)
    }
}


export default new Event_Core();