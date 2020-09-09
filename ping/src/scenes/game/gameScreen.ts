import Screen from '../../managers/classes/screen';

import Ball from './assets/ball';
import Paddle from './assets/paddle';

class GameScreen extends Screen{
    ball: Ball;

    constructor(gameData){
        super(gameData);
        this.ball = new Ball(50,30,2);
    }
    update(deltaTime, updateStore, soundController): void{
        this.ball.move();
        if(this.checkForBallCollission()){
           soundController('bounce', .2);
        }
    }
    draw(): void{
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = "center";
        this.ctx.font = '30px serif';
        this.ctx.fillText(`${this.data.playerScore} - ${this.data.aiScore}`, this.canvas.clientWidth/2, this.canvas.height/2);
        this.ctx.fillRect(this.ball.x, this.ball.y, 10, 10);
    }
    checkForBallCollission(): boolean{
        let collided = false;
        if(this.ball.x + 10 >= this.canvas.clientWidth || this.ball.x  <= 0 ){
            this.ball.collideAndReverse(1, 0);
            collided = true;
        }
        
        if(this.ball.y + 11 >= this.canvas.height || this.ball.y <= 0 ){
            this.ball.collideAndReverse(0, 1);
            collided = true;
        }

        return collided;
    }
}

export default GameScreen;