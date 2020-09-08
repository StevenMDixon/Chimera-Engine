import Screen from '../../managers/screen';

class StartScreen extends Screen {
    constructor(gameProps: any){
        super(gameProps);
    }
    draw(){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "2px Arial";
        this.ctx.fillText("Ping", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
        this.ctx.fillText("Press Any button to start!", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2 + 10);
    }
    handleInput(event: KeyboardEvent){
        if(event.keyCode > 0){
            this.gotoNextScene('');
        }
    }
}

export default StartScreen;