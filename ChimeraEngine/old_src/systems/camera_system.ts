import System_Base from './system_base';
import Store from '../core/store';
import Vector from "../modules/vector";
import {createCollidable, convertToCollidable} from '../modules/utils';

interface iCameraOptions {
        deadZone?: { // replaces camera border
            x: number,
            y: number
        },
        damping?: { // how fast the camera moves
            x: number,
            y: number
        },
        lookAhead?: {
            distance: number,
            ignoreY: boolean
        },
        bounds?: {
            left?: number,
            right?: number,
            top?: number,
            bottom?: number
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

       let options = camera.options;
       
        entities.query(...this.targetComponents).forEach(e => {
            if(e.hasComponent('Size', 'Position')){
               // this.x = this.x - (this.x - (this.target.x - this.game.width / 2)) *  this.lerp;
               // this.y = this.y - (this.y - (this.target.y - this.game.height / 2)) *  this.lerp;
                
                let p = convertToCollidable(e);

                //@todo implement lookahead
                if(options.lookAhead > 0){
                    const {velocity} = e.getComponent('Physics');
                    p['pos'].add({x: Math.sign(velocity.x) * 0, y: Math.sign(velocity.y) * 0});
                }
                

                const distance = Vector.subtract(p['pos'], nc.pos);
                const n = nc.pos.vLinearInt(p['pos'], (deltaTime/ (100 * camera.options.smoothing)) * camera.options.damping )
                const diffVec = Vector.subtract(n, Vector.divide(camera.size, 2 * scale));
                let calcVec = nc.og;

                if ((options.deadZone.x == 0 && options.deadZone.y == 0) || (Math.abs(distance.x) > options.deadZone.x && Math.abs(distance.y) > options.deadZone.y)){
                   calcVec = diffVec;
                } 
                else if (Math.abs(distance.x) > options.deadZone.x){
                    calcVec = new Vector(diffVec.x, nc.og.y);
                } else if (Math.abs(distance.y) > options.deadZone.y){
                    calcVec = new Vector(nc.og.x, diffVec.y);
                }

                if(options.bounds){
                    if(calcVec.x < options.bounds.left){
                        calcVec.x = 0;
                    }

                    if(calcVec.x + camera.size.x / scale > options.bounds.right ){
                        calcVec.x = options.bounds.right - camera.size.x / scale;
                    }

                    if(calcVec.y < options.bounds.top){
                        calcVec.y = 0;
                    }

                    if(calcVec.y + camera.size.y / scale > options.bounds.bottom ){
                        calcVec.y = options.bounds.bottom - camera.size.y / scale;
                    }
                }

                camera.offSets.set(calcVec);
            }
       })

       if(debug){
        ctx.strokeRect(200/ scale, 200/ scale, 1, 1);
        // @todo fix at different scales
        ctx.strokeRect((200 - options.deadZone.x *2)/ scale , (200- options.deadZone.y *2)/ scale  , options.deadZone.x * 2, options.deadZone.y * 2);
        
       }

    }
}

export default Camera_System;
