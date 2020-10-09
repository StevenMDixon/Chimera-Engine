import System_Base from './system_base';
import Controller from '../modules/controller';
import { Entity } from '..';

class Controller_System extends System_Base{
    enablePad: boolean;
    gamePad: Controller;
    inputs: object;

    constructor(){
        super();
        this.order = 0;
        this.enablePad = false;
        this.gamePad = new Controller();
        this.inputs = {}
        this.targetComponents = ['controller'];
    }

    init(): void{
        document.addEventListener('keydown', (ev) => { return this.onKey(ev, ev.keyCode, true, 'keyboard');  }, false);
        document.addEventListener('keyup',   (ev) => { return this.onKey(ev, ev.keyCode, false, 'keyboard'); }, false);
        if(this.enablePad){
            this.gamePad.listenForGamePad((ev, v, action) => { return this.onKey(ev, v, action, 'pad'); })
        }
    }

    update(deltaTime: number, enities){
        //@Todo find all gameObjects listening for inputs give them the inputs
        //console.log(enities)
        enities.forEach(e => e.getComponent('Input').inputs = this.inputs);
    }

    onKey(event, key, pressed, type): void{
        if(type === 'keyboard'){
            event.preventDefault();
             this.inputs[key] = pressed;
        }
        if(type === 'pad'){
           key.forEach(item => {
             this.inputs[item] = pressed;
           })
        }
    }

    overrideControllerMapping(map: object): void{
       this.gamePad.overrideControllerMapping(map);
    }
}

export default Controller_System;