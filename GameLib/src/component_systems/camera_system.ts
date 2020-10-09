import System_Base from './system_base';
import Store from '../modules/store';
import {AABB, DIAG} from '../modules/collider'

class Camera_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['CameraFocus'];
    }

    init(){
        
    }

    update(deltaTime, enities){
       const {camera} = Store.getStore('engine').access('camera');
       //console.log(camera)
       
       
    }
}

export default Camera_System;