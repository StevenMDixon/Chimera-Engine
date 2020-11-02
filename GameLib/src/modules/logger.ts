//@Todo logger uses resources and still slows stuff down

import LogWorker from 'worker-loader?filename=[name].[hash].js&inline=fallback!../workers/logger.worker.js';

class Logger{
    worker: Worker;
    enabled: boolean;
    constructor(){
        this.worker = new(LogWorker as any)();
        this.enabled = true;
    }
    log(data){
        if(this.enabled){
            this.worker.postMessage(data);
        }
    }
    switch(state){
        this.enabled = state;
    }   
}

export default new Logger();