
import Vector from '../modules/vector';


class Camera{
    pos: Vector;
    size: Vector;
    offSets: Vector

    constructor(x, y, w, h){
        this.pos = new Vector(x, y);
        this.size = new Vector(w, h);
        this.offSets = new Vector(x, y)
    }
}

export default Camera;