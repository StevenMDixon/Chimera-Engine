import {Entity} from '../../../lib';

class Player extends Entity {
    xVel: number;
    yVel: number;
    friction: number;


    constructor(x, y, w, h, r, sprite){
        super(x, y, w, h, r, sprite, 'square');
        this.state = 'idle';
        this.frameLimit = 80;
        this.spriteLength = 4;
        this.stateMap = {
            'idle': [0,0],
            'jump': [0,1]
        }
        this.xVel = 0,
        this.yVel = 0
        this.friction = 0.5;
    }

    move(){
        this.x += this.xVel;
        this.y += this.yVel;
        this.yVel += 1.0;
        this.xVel -= 1.0;
        this.yVel *= this.friction;
        this.xVel *= this.friction;

        if(this.x <= 30){
            this.x = 30;
        }
    }

    jump(){
        this.y -= 30;
        this.currentFrame = 0;
        this.spriteLength = 0;
        this.state = 'jump';
    }
    isJumping(){
        if(this.state === 'jump'){
            return true;
        }
        return false;
    }
    collide(){  
        this.yVel = 0;
        if(this.state !== 'idle'){
            this.currentFrame = 0;
            this.spriteLength = 4 ;
            this.state = 'idle' 
        }
    }
}

export default Player;