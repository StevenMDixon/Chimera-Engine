import System_Base from './system_base';
import Store from '../core/store';
import Vector from "../modules/vector";
import {createCollidable, convertToCollidable, round} from '../modules/utils';



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
       const {camera, scale, ctx} = Store.getStore('engine').access('camera', 'scale', 'ctx');
       ctx.strokeStyle = 'red'
       let nc = createCollidable(camera.offSets.x, camera.offSets.y, camera.size.x / scale, camera.size.y / scale); 
        
        entities.query(...this.targetComponents).forEach(e => {
            if(e.hasComponent('Size', 'Position')){
                let p = convertToCollidable(e);
                camera.offSets.set(Vector.subtract(nc.pos.vLinearInt(p['pos'], .1), Vector.divide(camera.size, 2 * scale)))
            }
       })

       
      ctx.strokeRect(200/ scale, 200/ scale, 1, 1)
    }
}

export default Camera_System;

function lerp(start, end, t) {
    return start * (1 - t) + end * t
  }