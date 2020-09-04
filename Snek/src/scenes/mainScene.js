import Scene from './scene.js';
import Player from '../managers/entities/player';

class MainScreen extends Scene {
    constructor(gameProps){
        super(gameProps);
        this.player = null;
        this.setup();
    }
    setup(){
        this.player = new Player(this.getRandomLoc('w'), this.getRandomLoc('h'), 1, 1);
    }
    update(deltaTime){

    }
    draw(){
        this.ctx.fillStyle = '#ff0ff0';
        console.log(this.player)
        this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h)
    }   
    handleInput(event){
        if(event.keyCode === 37){
            // left
        }
        else if(event.keyCode === 39){
            // right
        }
        else if(event.keyCode === 38){
            // up 
        }
        else if(event.keyCode === 40){
            // down
        }
    }
    getRandomLoc(option) {
        switch(option) {
            case 'h' : return Math.floor(Math.random() * this.canvas.height / this.scale)
            case 'w' : return Math.floor(Math.random() * this.canvas.clientWidth / this.scale)
        }
        
    }
}

export default MainScreen;