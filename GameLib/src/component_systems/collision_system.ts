import System_Base from './system_base';

class Collision_System extends System_Base{
    constructor(){
        super();
        this.targetComponents = ['Solid']
    }

    init(){
        
    }

    update(deltaTime, enities){

    }
}

export default Collision_System;