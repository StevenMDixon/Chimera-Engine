import {Entity} from './object';
//import {AABB} from '../modules/collider';
import Vector2D from '../modules/vector';

class Camera extends Entity{
    x: number;
    y: number;
    w: number;
    h: number;
    xOffset: number;
    yOffset: number;
    target: Entity

    constructor(x, y, w, h){
        super(x,y, w, h);
        this.xOffset = x;
        this.yOffset = y;
        this.target = null;
    }

    updateCamera(){
        if(this.target){
            this.xOffset = -this.size.x/2 + this.target.pos.x + this.target.size.x/2 
            this.yOffset = -this.size.y/2 + this.target.pos.y + this.target.size.y/2 
        }

    }

    attach(object){
        this.target = object;
    }

    getCameraTools(){
        return {
            attach: this.attach.bind(this),
            getOffsets: this.getOffsets.bind(this)
        }
    }

    getOffsets(){
        return {
            xOffset: this.xOffset,
            yOffset: this.yOffset
        }
    }

    checkifViewable(object){
        // return AABB(
        // new Entity(this.xOffset, this.yOffset, this.size.x, this.size.y)
        // , object);
    }
}

export default Camera;