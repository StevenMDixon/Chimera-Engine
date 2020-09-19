import Mapping from './controllerMapping';


class Controller {
    interval: any;
    controllerOverride: object;

    constructor() {
        this.interval = null;
        this.controllerOverride = {}
    }

    listenForGamePad(fx) {
        if (!('ongamepadconnected' in window)) {
            // No gamepad events available, poll instead.
            this.interval = setInterval(() => this.pollGamepads(fx), 50);
        }
    }

    stopListenforGamePad() {
        clearInterval(this.interval);
    }

    pollGamepads(fx) {
        let gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        let gamepadArray = [];
        let pressed = [];
        let oneGamepad = null;
        let controllerID = '';
         
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i] !== null) {
                gamepadArray.push(gamepads[i]);
            }
        }
       

        if (gamepadArray.length <= 0) {
            return null;
        }

        let mappedIds = Object.keys(Mapping);

        mappedIds.forEach(id => {
            if (gamepadArray.find(g => g.id.indexOf(id) > -1)) {
                oneGamepad = gamepadArray.find(g => g.id.indexOf(id) > -1);
            }
        });
       
        const gp = oneGamepad;
        if (!!gp) {
            controllerID = gp.id;
            for (let f = 0; f <= 1; f++) {
                if (gp.axes[f] > .75) {
                    fx({ keyCode: f % 2 === 0 ? 39 : 40 });
                } else if (gp.axes[f] < -0.75) {
                    fx({ keyCode: f % 2 === 0 ? 37 : 38 });
                }
            }


            for (let i = 0; i < gp.buttons.length; i++) {
                if (gp.buttons[i].pressed) {
                    const id = i;
                    pressed.push(id);
                }
            }
        }

        
        if (pressed.length === 0 || controllerID === '') {
            //console.log('No button pressed at the moment...');
            return 0;
        } else {
            let buttons = {...Mapping[controllerID].buttons, ...this.controllerOverride}
            console.log(this.controllerOverride)
            console.log(buttons)
           // console.log(buttons[pressed[0]])
            fx({ keyCode: buttons[pressed[0]] , type: 'controller'});
        }
    }

    overrideControllerMapping(mapping: object){
        console.log(mapping)
        this.controllerOverride = mapping;
    }
}

export default Controller;