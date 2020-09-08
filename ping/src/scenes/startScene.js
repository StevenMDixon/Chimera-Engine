import Scene from './scene.js';

class StartScreen extends Scene {
    constructor(gameProps){
        super(gameProps);
    }
    update(deltaTime){
       
    }
    draw(){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "2px Arial";
        this.ctx.fillText("Ping", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
        this.ctx.fillText("Press Any button to start!", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2 + 10);
    }
    handleInput(event){
        if(event.keyCode > 0){
            this.nextScene();
        }
    }
}

export default StartScreen;