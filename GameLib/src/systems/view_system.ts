import {partition, getCenterOfPoly, createVerticesFromSize, convertToCollidable} from '../modules/utils';
import {SAT} from '../modules/collider';
import Store from '../core/store';
import System_Base from './system_base';
import Components from '../components/components';

class Render_System extends System_Base{
    camera: any

    constructor(){
        super();
        this.targetComponents = ['Position', 'Renderable'];
        this.camera = {};
    }

    init(){
        const {camera} = Store.getStore('engine').access('camera', 'totalTime', 'debug');
        this.camera['og'] = camera.offSets;
        this.camera['pos'] = {x: camera.offSets.x + camera.size.x/2, y: camera.offSets.y + camera.size.y/2};
        this.camera['vertices'] = createVerticesFromSize(camera.offSets, camera.size);
    }

    update({deltaTime, entities}){
        const {camera} = Store.getStore('engine').access('camera', 'totalTime', 'debug');

        if(this.camera.og.x !== camera.offSets.x || this.camera.og.y !== camera.offSets.y){
            this.camera['og'] = camera.offSets;
            this.camera['pos'] = {x: camera.offSets.x + camera.size.x/2, y: camera.offSets.y + camera.size.y/2}
            this.camera['vertices'] = createVerticesFromSize(camera.offSets, camera.size);
        }

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

        //console.log(entities.query('Viewable'))
    }
}

export default Render_System;