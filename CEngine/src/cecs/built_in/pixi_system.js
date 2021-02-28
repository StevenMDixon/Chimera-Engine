import System from '../system';

class Pixi_Transform_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "Pixi"];
      this.excludeComponents = [];
    }
    update(next, dt){
      this.cachedEntities.forEach((entity) => {
        const transform = entity.components.get('Transform');
        const {pixi} = entity.components.get('Pixi');

        pixi.x = transform.x;
        pixi.y = transform.y;
        pixi.rotation = transform.rotation;


        pixi.update(dt);

      })

      //this.publish('&sys_error', 'hi');
      next();
    }
}

export default Pixi_Transform_System;