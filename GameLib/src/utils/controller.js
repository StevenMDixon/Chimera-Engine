import Mapping from '../config/default_controller_map';

class Controller {
    constructor() {
        this.interval = null;
        this.controllerOverride = {};
        this.previousKeys = [];
        this.recentPress = 0
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
                    pressed.push(f % 2 === 0 ? 39 : 40);
                } else if (gp.axes[f] < -0.75) {
                    pressed.push( f % 2 === 0 ? 37 : 38);
                }
            }

            for (let i = 0; i < gp.buttons.length; i++) {
                if (gp.buttons[i].pressed) {
                    pressed.push(i);
                }
            }
        }

        
        if (pressed.length === 0 || controllerID === '') {
            //console.log('No button pressed at the moment...');\
            if(this.recentPress == 1){
                fx({}, this.previousKeys, false);
                this.recentPress = 0;
            }
            
            return 0;
        } else {
            let buttonMap = {...Mapping[controllerID].buttons, ...this.controllerOverride};

            let current = pressed.map(key => (buttonMap[key]));
            console.log(current)
            fx({}, this.previousKeys, false);

            this.previousKeys = current;
            this.recentPress = 1;
            fx({}, current, true);
        }
    }

    overrideControllerMapping(mapping){
        this.controllerOverride = mapping;
    }
}

export default Controller;