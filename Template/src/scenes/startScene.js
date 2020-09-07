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
        this.ctx.fillText("Hello World", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
    }
    handleInput(event){
        console.log('test')
        if(event.keyCode > 0){
            this.nextScene();
        }
    }
}

export default StartScreen;