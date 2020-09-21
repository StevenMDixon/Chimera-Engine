import {Entity} from 'GameLib';

class Player extends Entity{
    constructor(x, y, w, h){
        super(x, y, w, h, 0, 'all', 'square');
        this.state = 'man1'
    }
}

export default Player;