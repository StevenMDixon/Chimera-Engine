import {Entity} from 'GameLib';

class Player extends Entity{

    constructor(x, y, w, h){
        super(x, y, w, h);
        this.state = 'idle'
        //this.rotation = r;
        this.spriteSheet = 'player';
        this.stateMap = {
            'idle': 0,
            'walk-up': 2,
            'walk': 5 
        }
    }

    setState(){
        console.log(this.velocity)
        if(this.velocity.x !== 0  && this.velocity.y > 0 || this.velocity.y > 0){
            this.state = 'walk';
        } else if (this.velocity.x !== 0 && this.velocity.y < 0 || this.velocity.y < 0){
            this.state = 'walk-up';
        } else if (this.velocity.x !== 0) {
            this.state = 'walk';
        } else {
            this.state = 'idle';
        }
    }
   // move(deltatime){
        // if(this.xVelocity !== 0  && this.yVelocity > 0 || this.yVelocity > 0){
        //     this.state = 'walk';
        // } else if (this.xVelocity !== 0 && this.yVelocity < 0 || this.yVelocity < 0){
        //     this.state = 'walk-up';
        // } else if (this.xVelocity !== 0) {
        //     this.state = 'walk';
        // } else {
        //     this.state = 'idle'
        // }

        // this.y += this.yVelocity * deltatime/100;
        // this.yVelocity *= this.yFriction;

        // this.x += this.xVelocity * deltatime/100;
        // this.xVelocity *= this.xFriction;
   // }


}

export default Player;