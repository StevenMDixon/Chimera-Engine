import Entity from './enitity';

class Player extends Entity{
    constructor(x, y, h, w){
        super(x,y,h,w);
        this.snake = [{x: x, y: y}];
        this.direction = ['r'];
    }
    move(){
        let headNewLoc;
        if (this.direction[0] == 'r'){
            headNewLoc = {x: this.snake[0].x + 1, y: this.snake[0].y }
        }
        else if (this.direction[0] == 'l'){
            headNewLoc = {x: this.snake[0].x - 1, y: this.snake[0].y }
        }
        else if (this.direction[0] == 'u'){
            headNewLoc = {x: this.snake[0].x, y: this.snake[0].y + 1 }
        }
        else if (this.direction[0] == 'd'){
            headNewLoc = {x: this.snake[0].x, y: this.snake[0].y - 1}
        }
        this.direction = [this.direction[0]];
        return this.moveBody(headNewLoc);
    }
    changeDirection(dir){
        this.direction.unshift(dir);
    }
    addBody(){
        if(this.direction[0] == 'l'){
            this.snake.unshift({x: this.snake[0].x - 1, y: this.snake[0].y})
        }
        else  if(this.direction[0] == 'r'){
            this.snake.unshift({x: this.snake[0].x + 1, y: this.snake[0].y})
        }
        else  if(this.direction[0] == 'u'){
            this.snake.unshift({x: this.snake[0].x, y: this.snake[0].y + 1})
        }
        else  if(this.direction[0] == 'd'){
            this.snake.unshift({x: this.snake[0].x, y: this.snake[0].y - 1})
        }
    }
    moveBody(newLoc){
        let collided = false;
        for(let i = this.snake.length - 1; i > 0; i--){
            if(this.snake[i].x == newLoc.x && this.snake[i].y == newLoc.y){
                collided = true;
            }
            this.snake[i].x  = this.snake[i-1].x;
            this.snake[i].y  = this.snake[i-1].y;
        }
        this.snake[0] = newLoc;

        return collided;
    }
    getHeadLocation(){
        return this.snake[0];
    }
}

export default Player;