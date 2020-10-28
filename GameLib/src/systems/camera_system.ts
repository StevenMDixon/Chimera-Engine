import System_Base from './system_base';
import Store from '../core/store';
import Vector from "../modules/vector";
import {createCollidable, convertToCollidable, round} from '../modules/utils';

interface iCameraOptions {
        deadZone: { // replaces camera border
            x: number,
            y: number
        },
        damping: { // how fast the camera moves
            x: number,
            y: number
        },
        lookAhead: {
            time: number,
            smoothing: number,
            ignoreY: boolean
        }

}

class Camera_System extends System_Base{
    center: any
    constructor(){
        super();
        this.targetComponents = ['CameraFocus'];
    }

    init(){}

    update({deltaTime, entities}){
       const {camera, scale, ctx, cameraBorder, debug} = Store.getStore('engine').access('camera', 'scale', 'ctx', 'cameraBorder', 'debug');
       ctx.strokeStyle = 'red'
       let nc = createCollidable(camera.offSets.x, camera.offSets.y, camera.size.x / scale, camera.size.y / scale);

        entities.query(...this.targetComponents).forEach(e => {
            if(e.hasComponent('Size', 'Position')){
               // this.x = this.x - (this.x - (this.target.x - this.game.width / 2)) *  this.lerp;
               // this.y = this.y - (this.y - (this.target.y - this.game.height / 2)) *  this.lerp;

                let p = convertToCollidable(e);

                let distance = Vector.subtract(p['pos'], nc.pos);
                let diffVec = Vector.subtract(nc.pos.vLinearInt(p['pos'], (deltaTime/ 100) / 1.3), Vector.divide(camera.size, 2 * scale));
                let calcVec = diffVec//nc.og;

                // if (cameraBorder == 0 || (Math.abs(distance.x) > cameraBorder && Math.abs(distance.y) > cameraBorder)){
                //    calcVec = diffVec;
                // } else if (Math.abs(distance.x) > cameraBorder){
                //     calcVec = new Vector(diffVec.x, nc.og.y);
                // } else if (Math.abs(distance.y) > cameraBorder){
                //     calcVec = new Vector(nc.og.x, diffVec.y);
                // }


                camera.offSets.set(calcVec);
            }
       })

       if(debug){
        ctx.strokeRect(200/ scale, 200/ scale, 1, 1);
        ctx.beginPath();
        ctx.arc(200/ scale, 200/ scale, cameraBorder, 0, 2 * Math.PI);
        ctx.stroke();
       }

    }
}

export default Camera_System;
