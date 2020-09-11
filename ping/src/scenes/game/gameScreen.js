"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../lib/index");
const ball_1 = require("./assets/ball");
const paddle_1 = require("./assets/paddle");
class GameScreen extends index_1.Screen {
    constructor(gameData) {
        super(gameData);
        this.ball = new ball_1.default(gameData.canvas.clientWidth / 2 + 5, gameData.canvas.height / 2 + 5, 1.5);
        this.player = new paddle_1.default(gameData.canvas.clientWidth / 2 - 30, gameData.canvas.height - 30, 60, 10);
        this.enemy = new paddle_1.default(gameData.canvas.clientWidth / 2 - 30, 20, 60, 10);
    }
    update(deltaTime, updateStore, playEffect) {
        this.ball.move();
        //check to see if ball collided with goal
        if (this.checkGoalCollission() !== 'none') {
            if (this.checkGoalCollission() === 'player') {
                updateStore({ playerScore: this.data.playerScore += 1 });
            }
            if (this.checkGoalCollission() === 'enemy') {
                updateStore({ aiScore: this.data.aiScore += 1 });
            }
            playEffect('score', .2);
            this.ball.resetBall(this.canvas.clientWidth / 2 + 5, this.canvas.height / 2 + 5);
        }
        //check to see if ball collided with wall or paddles
        if (this.checkForBallCollission()) {
            playEffect('bounce', .2);
        }
        // player related movements
        if (this.checkPaddleCollission(this.player)) {
            this.player.updateVelocity(-this.player.velocity);
        }
        this.player.move(deltaTime / 1000);
        // ai related movements
        this.enemy.x = this.ball.x - this.enemy.w / 2;
        if (this.enemy.x <= 0) {
            this.enemy.x = 0;
        }
        if (this.enemy.x + this.enemy.w >= this.canvas.clientWidth) {
            this.enemy.x = this.canvas.clientWidth - this.enemy.w;
        }
        if (this.checkForPointMatch(this.data.playerScore) || this.checkForPointMatch(this.data.aiScore)) {
            if (this.data.playerScore >= 5) {
                updateStore({ playerWin: true });
            }
            this.gotoNextScreen('EndScreen');
        }
    }
    draw() {
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = "center";
        this.ctx.font = '30px serif';
        this.ctx.fillText(`${this.data.playerScore} - ${this.data.aiScore}`, this.canvas.clientWidth / 2, this.canvas.height / 2);
        // draw the ball
        this.ctx.fillRect(this.ball.x, this.ball.y, 10, 10);
        // draw the player
        this.ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h);
        // draw the enemy 
        this.ctx.fillRect(this.enemy.x, this.enemy.y, this.enemy.w, this.enemy.h);
    }
    checkForBallCollission() {
        let collided = false;
        if (this.ball.x + 10 >= this.canvas.clientWidth || this.ball.x <= 0) {
            this.ball.collideAndReverse(1, 0);
            collided = true;
        }
        if (this.ball.y + 11 >= this.canvas.height || this.ball.y <= 0) {
            this.ball.collideAndReverse(0, 1);
            collided = true;
        }
        if (this.ball.x >= this.player.x && this.ball.x <= this.player.x + this.player.w && this.ball.y + 11 >= this.player.y && this.ball.y <= this.player.y + this.player.h) {
            this.ball.collideAndReverse(0, 1);
            collided = true;
        }
        if (this.ball.x >= this.enemy.x && this.ball.x <= this.enemy.x + this.enemy.w && this.ball.y + 10 >= this.enemy.y && this.ball.y <= this.enemy.y + this.enemy.h) {
            this.ball.collideAndReverse(0, 1);
            collided = true;
        }
        return collided;
    }
    handleInput(event) {
        if (event.keyCode === 37) {
            this.player.updateVelocity(-1);
        }
        else if (event.keyCode === 39) {
            this.player.updateVelocity(1);
        }
    }
    checkPaddleCollission(paddle) {
        if ((paddle.x + paddle.w) + paddle.velocity >= this.canvas.clientWidth) {
            return true;
        }
        if (paddle.x + paddle.velocity <= 0) {
            return true;
        }
        return false;
    }
    checkGoalCollission() {
        if (this.ball.y <= 1) {
            return 'player';
        }
        if (this.ball.y + 10 >= this.canvas.height - 1) {
            return 'enemy';
        }
        return 'none';
    }
    checkForPointMatch(score) {
        if (score > 5)
            return true;
        return false;
    }
}
exports.default = GameScreen;
//# sourceMappingURL=gameScreen.js.map