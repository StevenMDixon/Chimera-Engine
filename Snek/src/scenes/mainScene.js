import Scene from './scene.js';
import Player from '../managers/entities/player';
import Fruit from '../managers/entities/fruit';

class MainScreen extends Scene {
    constructor(gameProps){
        super(gameProps);
        this.player = null;
        this.fruit = null;
        this.updateInterval = 150;
        this.currentInterval = 0;
        this.setup();
    }
    setup(){
        this.player = new Player(this.getRandomLoc('w'), this.getRandomLoc('h'), 1, 1);
        this.fruit = new Fruit(this.getRandomLoc('w'), this.getRandomLoc('h'), 1, 1);
    }
    update(deltaTime){
        this.currentInterval = this.currentInterval += deltaTime;
        if(this.currentInterval > this.updateInterval){
            // checks for self collision
            if(this.player.move() || this.checkForEndCollision()){
                this.nextScene();
            }
            // checks for fruit collision
            if(this.checkForFruitCollision()){
                this.player.addBody();
                this.fruit = new Fruit(this.getRandomLoc('w'), this.getRandomLoc('h'), 1, 1);
                this.updateInterval = (this.updateInterval - this.player.snake.length * 2 ) > 50 ? (this.updateInterval - this.player.snake.length * 2 ) : 50;
                console.log(this.updateInterval)
            }
            this.currentInterval = 0;
        }
    }
    draw(){
        this.ctx.fillStyle = '#ff0ff0';
        this.player.snake.forEach(part => {
            this.ctx.fillRect(part.x, part.y, this.player.w, this.player.h);
        });
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(this.fruit.x, this.fruit.y, this.fruit.w, this.fruit.h);
    }   
    handleInput(event){
        if(event.keyCode === 37){
            this.player.changeDirection('l');
        }
        else if(event.keyCode === 39){
            this.player.changeDirection('r');
        }
        else if(event.keyCode === 38){
            this.player.changeDirection('d');
        }
        else if(event.keyCode === 40){
            this.player.changeDirection('u');
        }
    }
    getRandomLoc(option) {
        switch(option) {
            case 'h' : return Math.floor(Math.random() * this.canvas.height / this.scale)
            case 'w' : return Math.floor(Math.random() * this.canvas.clientWidth / this.scale)
        }
        
    }
    checkForFruitCollision() {
        let head = this.player.getHeadLocation();
        if(head.x == this.fruit.x && head.y == this.fruit.y){
            return true;
        }
        return false;
    }
    checkForEndCollision() {
        let head = this.player.getHeadLocation();
        console.log(this.canvas.clientWidth/this.scale)
        if (head.x > this.canvas.clientWidth/this.scale - 1|| head.x < 0){
            console.log('x')
            return true;
        } else if (head.y > this.canvas.height/this.scale - 1 || head.y < 0) {
            return true;
        } 
        return false;
    }
}

export default MainScreen;