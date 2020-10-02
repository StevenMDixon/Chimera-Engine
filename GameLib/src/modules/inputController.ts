import Controller from './controller';


function InputController(){
       let input = {};
       let gamePad = new Controller();
       let fn = null;
    return {

    setup(call, enablePad){
        fn = call
        document.addEventListener('keydown', (ev) => { return this.onKey(ev, ev.keyCode, true, 'keyboard');  }, false);
        document.addEventListener('keyup',   (ev) => { return this.onKey(ev, ev.keyCode, false, 'keyboard'); }, false);
        if(enablePad){
            this.gamePad.listenForGamePad((ev, v, action) => { return this.onKey(ev, v, action, 'pad'); })
        }
    },
    
    onKey(event, key, pressed, type){
        if(type === 'keyboard'){
            event.preventDefault();
            input[key] = pressed;
        }
        if(type === 'pad'){
           key.forEach(item => {
               input[item] = pressed
           })
        }
        fn(input);
    },

    overrideControllerMapping(map){
        gamePad.overrideControllerMapping(map);
    }
}
}

export default InputController()
