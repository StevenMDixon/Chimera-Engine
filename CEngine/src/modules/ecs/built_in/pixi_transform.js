import System from '../system';

class Pixi_Transform_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "Pixi", "Movable"];
      this.excludeComponents = [];
    }
    update(next, dt){
      // @2000 entities my laptop slows down, 
      // care will need to be taken not to reduce performance
      for(const [i, entity] of this.cachedEntities){
        const transform = entity.components.get('Transform');
        const {pixi} = entity.components.get('Pixi');

        pixi.x = transform.x;
        pixi.y = transform.y;
        pixi.rotation = transform.rotation;
        pixi.scale.set(transform.scale.x, transform.scale.y);
      }
    }
}

export default Pixi_Transform_System;