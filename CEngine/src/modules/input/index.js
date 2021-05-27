import Controller from './controller';

class InputManager {
    constructor(){
        this.gamePad = new Controller();
        this.inputs = {}
        this.init();
        this.sendTarget = null;
    }

    init(){
        document.addEventListener('keydown', (ev) => { return this.onKey(ev, ev.keyCode, true, 'keyboard');  }, false);
        document.addEventListener('keyup',   (ev) => { return this.onKey(ev, ev.keyCode, false, 'keyboard'); }, false);
    }

    sendTo(fn){
        this.sendTarget = fn;
    }

    onKey(event, key, pressed, type){
        // console.log(event, key, pressed, type)
        if(type === 'keyboard'){
            event.preventDefault();
             this.inputs[key] = pressed;
        }
        if(type === 'pad'){
           key.forEach(item => {
             this.inputs[item] = pressed;
           })
        }
        
        this.sendTarget(this.inputs);
    }

    overrideControllerMapping(map){
       this.gamePad.overrideControllerMapping(map);
    }

    enableGamePad(){
        this.gamePad.listenForGamePad((ev, v, action) => this.onKey(ev, v, action, 'pad'));
    }
}

export default new InputManager();