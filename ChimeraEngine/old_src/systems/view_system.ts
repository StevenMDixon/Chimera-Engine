import {partition, getCenterOfPoly, createVerticesFromSize, convertToCollidable, createCollidable} from '../modules/utils';
import {SAT} from '../modules/collider';
import Store from '../core/store';
import System_Base from './system_base';
import Components from '../components/components';
import Vector from "../modules/vector";

class Render_System extends System_Base{
    camera: any

    constructor(){
        super();
        this.targetComponents = ['Position', 'Renderable'];
        this.camera = {};
    }

    init(){
        const {camera, scale} = Store.getStore('engine').access('camera', 'totalTime', 'debug');
        
    }

    update({deltaTime, entities}){
        const {camera, scale, ctx} = Store.getStore('engine').access('camera', 'debug', 'scale', 'ctx');
        
        this.camera = createCollidable(camera.offSets.x, camera.offSets.y, camera.size.x / scale, camera.size.y / scale)

        entities.query(...this.targetComponents).forEach(item => {
            let e2 = convertToCollidable(item);
            if (SAT(this.camera, e2)){
                if(!item.hasComponent('Viewable')){
                    item.addComponent(new Components.components.Viewable())
                }
            }else {
                if(item.hasComponent('Viewable')){
                    item.removeComponent('Viewable');
                }
            }
        })
    
    }
}

export default Render_System;