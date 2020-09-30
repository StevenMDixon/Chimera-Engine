import {Entity} from '../../../lib';

class Tile extends Entity {
    type: number;

    constructor(x, y, type){
        super(x, y, 16, 16, 0, 'tiles', 'square');
        this.type = type
    }

    getSpriteInfo() : object{
        return {
            spriteSheet: this.spriteSheet,
            x: this.x,
            y: this.y,
            w: this.spriteWidth,
            h: this.spriteHeight,
            type: this.type
        }
    }
}

export default Tile;