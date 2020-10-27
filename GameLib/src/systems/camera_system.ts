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
        //this.center = {};
    }

    init(){
        const {cameraBorder, ctx, scale} = Store.getStore('engine').access('cameraBorder', 'ctx', 'scale');
        if(cameraBorder > 0){
            //this.center = createCollidable((ctx.canvas.clientWidth/(2*scale) - cameraBorder/2), (ctx.canvas.clientHeight/(2*scale) - cameraBorder/2) ,cameraBorder,cameraBorder);
        }
    }


    

    update({deltaTime, entities}){
       const {camera, scale, ctx, cameraBorder, debug} = Store.getStore('engine').access('camera', 'scale', 'ctx', 'cameraBorder', 'debug');
       ctx.strokeStyle = 'red'
       let nc = createCollidable(camera.offSets.x, camera.offSets.y, camera.size.x / scale, camera.size.y / scale); 
        
        entities.query(...this.targetComponents).forEach(e => {
            if(e.hasComponent('Size', 'Position')){
               

                let p = convertToCollidable(e);

                let distance = Vector.subtract(p.pos, nc.pos);
                //console.log(distance)
                if((Math.abs(distance.x) >= cameraBorder || Math.abs(distance.y) >= cameraBorder) || cameraBorder == 0){
                    let diffVec = Vector.subtract(nc.pos.vLinearInt(p['pos'], .1), Vector.divide(camera.size, 2 * scale));
                    camera.offSets.set(diffVec)
                }
                
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

function lerp(start, end, t) {
    return start * (1 - t) + end * t
  }