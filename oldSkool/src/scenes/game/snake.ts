import {Entity} from 'GameLib';

class Snake extends Entity{
    constructor(x, y, w, h, spriteSheet, r?){
        super(x, y, w, h, 0, spriteSheet, 'square');
        this.state = 'idle';
        this.stateMap = {
            'idle': 18
        }
    }
}

export default Snake;