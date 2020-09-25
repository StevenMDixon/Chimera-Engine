import Controller from './controller';


class InputController {
    input: object;
    gamePad: Controller;
    fn: (arg)=>{}

    constructor(){
        this.input = {};
        this.gamePad = new Controller();
        this.fn = null;

    }

    setup(fn, enablePad){
        this.fn = fn
        document.addEventListener('keydown', (ev) => { return this.onKey(ev, ev.keyCode, true, 'keyboard');  }, false);
        document.addEventListener('keyup',   (ev) => { return this.onKey(ev, ev.keyCode, false, 'keyboard'); }, false);
        if(enablePad){
            this.gamePad.listenForGamePad((ev, v, action) => { return this.onKey(ev, v, action, 'pad'); })
        }
        
    }
    
    onKey(event, key, pressed, type){
        if(type === 'keyboard'){
            event.preventDefault();
            this.input[key] = pressed;
        }
        if(type === 'pad'){
           key.forEach(item => {
               this.input[item] = pressed
           })
        }
        this.fn(this.input);
    }

    overrideControllerMapping(map){
        this.gamePad.overrideControllerMapping(map);
    }
    changeFn(fn){
        this.fn = fn;
    }
}

export default InputController 
