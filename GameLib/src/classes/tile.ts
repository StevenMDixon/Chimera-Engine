class Tile {
    x: number;
    y: number;
    w: number;
    h: number;
    type: number;

    constructor(x, y, w, h, type){
        this.x = x,
        this.y = y,
        this.h = h, 
        this.w = w, 
        this.type = type
    }

    getSpriteInfo() : object{
        return {
            x: this.x,
            y: this.y,
            w: this.w,
            h: this.h,
            type: this.type
        }
    }
}

export default Tile;