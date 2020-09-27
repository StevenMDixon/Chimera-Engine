import {Entity} from 'GameLib';

class Player extends Entity{

    constructor(x, y, w, h){
        super(x, y, w, h, 0, 'sprites', 'square');
        this.state = 'idle'
        this.xFriction = 0;
        this.yFriction = 0;
    }

    move(deltatime){
        if(this.xVelocity !== 0  && this.yVelocity > 0 || this.yVelocity > 0){
            this.state = 'walk';
        } else if (this.xVelocity !== 0 && this.yVelocity < 0 || this.yVelocity < 0){
            this.state = 'walk-up';
        } else if (this.xVelocity !== 0) {
            this.state = 'walk';
        } else {
            this.state = 'idle'
        }

        this.y += this.yVelocity * deltatime/100;
        this.yVelocity *= this.yFriction;

        this.x += this.xVelocity * deltatime/100;
        this.xVelocity *= this.xFriction;
    }
}

export default Player;