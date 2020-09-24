import {Entity} from 'GameLib';

class Player extends Entity{

    constructor(x, y, w, h){
        super(x, y, w, h, 0, 'all', 'square');
        this.state = 'man1'
        this.xFriction = .5;
        this.yFriction = .5;
    }

    move(deltatime){
        this.y += this.yVelocity * deltatime/100;
        this.yVelocity *= this.yFriction;


        this.x += this.xVelocity * deltatime/100;
        this.xVelocity *= this.xFriction;
    }
}

export default Player;