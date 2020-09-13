import {Entity} from '../../../lib';

class Player extends Entity {
    constructor(x, y, w, h, r, sprite){
        super(x, y, w, h, r, sprite, 'square');
        this.state = 'idle';
        this.frameLimit = 50;
        this.spriteLength = 4;
        this.stateMap = {
            'idle': [0,0],
            'jump': [0,1]
        }
    }
}

export default Player;