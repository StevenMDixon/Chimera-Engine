import {Screen} from '../../lib/index';

class StartScreen extends Screen {
    constructor(gameProps: any){
        super(gameProps);
    }
    draw(){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("This is the template", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
    }
    handleInput(event: KeyboardEvent){
        if(event.keyCode > 0){
            //this.gotoNextScreen('GameScreen');
        }
    }
}

export default StartScreen;