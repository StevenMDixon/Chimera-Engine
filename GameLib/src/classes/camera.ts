
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

    // updateCamera(){
    //     if(this.target){
    //         this.xOffset = -this.size.x/2 + this.target.pos.x + this.target.size.x/2 
    //         this.yOffset = -this.size.y/2 + this.target.pos.y + this.target.size.y/2 
    //     }

    // }

    checkifViewable(object){
        // return AABB(
        // new Entity(this.xOffset, this.yOffset, this.size.x, this.size.y)
        // , object);
    }
}

export default Camera;