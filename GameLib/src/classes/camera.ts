import Entity from './entity';
import {simpleCollision} from '../modules/collider';

class Camera {
    x: number;
    y: number;
    w: number;
    h: number;
    xOffset: number;
    yOffset: number;
    target: Entity

    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.xOffset = x;
        this.yOffset = y;
        this.w = w;
        this.h = h;
        this.target = null;
    }

    updateCamera(){
        if(this.target){
            const {x, y, w, h} = this.target;
            this.xOffset = -this.w/2 + x + w/2 
            this.yOffset = -this.h/2 + y + h/2 
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
        return simpleCollision({x: this.xOffset + this.x, y:this.yOffset +this.y, h: this.h, w: this.w}, object);
    }
}

export default Camera;