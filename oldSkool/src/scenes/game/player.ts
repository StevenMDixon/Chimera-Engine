import {Entity} from 'GameLib';

class Player extends Entity{



    constructor(x, y, w, h){
        super(x, y, w, h, 0, 'all', 'square');
        this.state = 'man1'
        this.xFriction = .8;
    }

    move(){
        this.x += this.xVelocity;
        this.xVelocity *= this.xFriction;
    }
}

export default Player;