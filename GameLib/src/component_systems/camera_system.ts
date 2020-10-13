import System_Base from './system_base';
import Store from '../modules/store';
import Vector from "../modules/vector";

class Camera_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['CameraFocus'];
    }

    init(){
        
    }

    update(deltaTime, entities){
       const {camera, scale} = Store.getStore('engine').access('camera', 'scale');
       entities.forEach(e => {
           const {pos} = e.getComponent("Position");
           const {size} = e.getComponent("Size");
           camera.offSets.set(new Vector(-camera.size.x/2 / scale + pos.x + size.x/2  , -camera.size.y/2 / scale + pos.y + size.y/2 ));
       })
    }
}

export default Camera_System;