import {Screen, Menu} from '../../lib/index';



class GameScreen extends Screen {

    constructor(gameProps: any){
        super(gameProps);

    }
    draw(delta, images){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Orbitron";
        this.ctx.drawImage(images['tiles'], 0, 0);
        this.ctx.fillText("This is the game", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);

    }
    handleInput(event: KeyboardEvent){
        
    }
}

export default GameScreen;