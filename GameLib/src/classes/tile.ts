class Tile {
    x: number;
    y: number;
    w: number;
    h: number;
    type: number;
    sheetType: string;

    constructor(x, y, w, h, type, sheetType){
        this.x = x,
        this.y = y,
        this.h = h, 
        this.w = w, 
        this.type = type
        this.sheetType = sheetType;
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