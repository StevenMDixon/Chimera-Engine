
import Vector from '../modules/vector';


class Camera{
    pos: Vector;
    size: Vector;
    offSets: Vector;
    options: any;
    
    constructor(x, y, w, h, options){
        this.pos = new Vector(x, y);
        this.size = new Vector(w, h);
        this.offSets = new Vector(x, y)
        this.options = options
    }
}

export default Camera;