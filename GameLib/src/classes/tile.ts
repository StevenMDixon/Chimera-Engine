import { Entity } from './object';

class Tile extends Entity{
    type: number;
    sheetType: string;

    constructor(x, y, w, h, type, sheetType){
        super(x, y, w, h);
        this.type = type;
        this.sheetType = sheetType;
    }
}

export default Tile;