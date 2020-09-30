import {Screen} from '../../lib/index';

class EndScreen extends Screen{
    constructor(gameProps){
        super(gameProps);
    }
    update(dt){
        
    }
    draw(dt){
        this.ctx.fillStyle = "Red";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`${this.data.playerWin? 'You Win!': 'You Lost!'}`, this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
        this.ctx.fillText(`${this.data.playerScore} - ${this.data.aiScore}`, this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2 + 30);
    }
    handleInput(event){
        if(event.keyCode > 0){
            this.nextScreen('StartScreen');
        }
    }
}

export default EndScreen