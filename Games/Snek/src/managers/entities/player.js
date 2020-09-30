import Entity from './enitity';

class Player extends Entity{
    constructor(x, y, h, w){
        super(x,y,h,w);
        this.snake = [{x: x, y: y}];
        this.direction = 'r';
    }
    move(){
        let headNewLoc;
        if (this.direction == 'r'){
            headNewLoc = {x: this.snake[0].x + 1, y: this.snake[0].y }
        }
        else if (this.direction == 'l'){
            headNewLoc = {x: this.snake[0].x - 1, y: this.snake[0].y }
        }
        else if (this.direction == 'u'){
            headNewLoc = {x: this.snake[0].x, y: this.snake[0].y + 1 }
        }
        else if (this.direction == 'd'){
            headNewLoc = {x: this.snake[0].x, y: this.snake[0].y - 1}
        }
        return this.moveBody(headNewLoc);
    }
    changeDirection(dir){
        this.direction = dir;
    }
    addBody(){
        if(this.direction == 'l'){
            this.snake.push({x: this.getTailLocation().x + 1, y: this.getTailLocation().y})
        }
        else  if(this.direction == 'r'){
            this.snake.push({x: this.getTailLocation().x - 1, y: this.getTailLocation().y})
        }
        else  if(this.direction == 'u'){
            this.snake.push({x: this.getTailLocation().x, y: this.getTailLocation().y - 1})
        }
        else  if(this.direction == 'd'){
            this.snake.push({x: this.getTailLocation().x, y: this.getTailLocation().y + 1})
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
    getTailLocation(){
        return this.snake[this.snake.length - 1]; 
    }
}

export default Player;