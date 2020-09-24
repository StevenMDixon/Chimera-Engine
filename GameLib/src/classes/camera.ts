import Entity from './entity';
import {simpleCollision} from './collider';

class Camera {
    x: number;
    y: number;
    w: number;
    h: number;
    target: Entity

    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.target = null;
    }


    updateCamera(){
        if(this.target){
            const {x ,y} = this.target.getCameraData();
            this.x = x/2;
            this.y = y/2;
        }
    }

    attach(object){
        this.target = object;
    }

    getCameraTools(){
        return {
            attach: this.attach.bind(this)
        }
    }

    checkifViewable(object){
        return simpleCollision({...this}, object);
    }
}

export default Camera;