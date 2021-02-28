import Controller from './controller';

class InputManager {
    constructor(){
        this.enablePad = false;
        this.gamePad = new Controller();
        this.inputs = {}
        this.init();
        this.sendTarget = null;
    }

    init(){
        document.addEventListener('keydown', (ev) => { return this.onKey(ev, ev.keyCode, true, 'keyboard');  }, false);
        document.addEventListener('keyup',   (ev) => { return this.onKey(ev, ev.keyCode, false, 'keyboard'); }, false);
        if(this.enablePad){
            this.gamePad.listenForGamePad((ev, v, action) => { return this.onKey(ev, v, action, 'pad'); })
        }
    }

    sendTo(fn){
        this.sendTarget = fn;
    }

    onKey(event, key, pressed, type){
        if(type === 'keyboard'){
            event.preventDefault();
             this.inputs[key] = pressed;
        }
        if(type === 'pad'){
           key.forEach(item => {
             this.inputs[item] = pressed;
           })
        }

        // need to register a component to call when this is called.
        //console.log(this.inputs, this.sendTarget)
        this.sendTarget(this.inputs);
    }

    overrideControllerMapping(map){
       this.gamePad.overrideControllerMapping(map);
    }
}

export default new InputManager();