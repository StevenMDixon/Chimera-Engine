import {Entity} from '../../../lib';

class Player extends Entity {
    xVel: number;
    yVel: number;
    friction: number;
    float: number;
    xFriction: number;
    yFriction: number; 

    constructor(x, y, w, h, r, sprite){
        super(x, y, w, h, r, sprite, 'square');
        this.state = 'idle';
        this.frameLimit = 60;
        this.spriteLength = 4;
        this.stateMap = {
            //   , ,Frame length
            'idle': [0,0,4],
            'jump': [0,1,0]
        }
        this.xVel = 0,
        this.yVel = 0
        this.xFriction = 0.4;
        this.yFriction = .4  ;
        this.float = 1.5;
        this.rotation = 0;
    }

    move(){
        this.x += this.xVel;
        this.y += this.yVel //* (this.state == 'jump' && this.yVel > 0 ? this.float : 1 );
        this.yVel += 1;
        //this.xVel -= 1.0;
        this.yVel *= this.yFriction;
        this.xVel *= this.xFriction;

        if(this.x <= 64){
            this.x = 64;
        }

        this.updateHitBox();
    }

    jump(){
        this.y -= 1;
        this.yVel -= 40;
        this.changeState('jump');
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
            this.changeState('idle')
        }
    }
    changeState(newState){
        if(this.stateMap[newState]){
            this.currentFrame = 0;
            this.spriteLength = this.stateMap[newState][2];
            this.state = newState
        }
    }
}

export default Player;