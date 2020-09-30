
import {Entity} from '../../../lib';


const sprites = {
    0: 'fan',
    1: 'smokestack'
}

class Box extends Entity {
    constructor(x, y, w, h){
        super(x, y, w, h, 0, 'tiles', 'square');
        this.state = sprites[Math.floor(Math.random() * 1.9)];
        this.frameLimit = 100;
        
        this.stateMap = {
            //   , ,Frame length
            'fan': [0,1,2],
            'smokestack' : [0,2,0]
        }

        this.spriteLength = 0;
        this.setup();
    }

    setup(){
        this.spriteLength = this.stateMap[this.state][2];
    }

    move(dt){
        this.x -= 1;
        this.updateHitBox();
        this.animate(dt);
    }

    reset(minx, maxx){
        this.x = Math.floor((Math.random() * maxx) + minx) + maxx;
        this.state = sprites[Math.floor(Math.random()* 1.9)];
        this.spriteLength = this.stateMap[this.state][2];
    }
}

export default Box;