import System from '../system';

class Pixi_Transform_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "Pixi"];
      this.excludeComponents = [];
    }
    update(next, dt){
      for(const [i, entity] of this.cachedEntities){
        const transform = entity.components.get('Transform');
        const {pixi} = entity.components.get('Pixi');

        pixi.x = transform.x;
        pixi.y = transform.y;
        pixi.rotation = transform.rotation;
        pixi.scale.set(transform.scale.x, transform.scale.y)
      }
      // this.cachedEntities.forEach((entity) => {
      //   const transform = entity.components.get('Transform');
      //   const {pixi} = entity.components.get('Pixi');

      //   pixi.x = transform.x;
      //   pixi.y = transform.y;
      //   pixi.rotation = transform.rotation;
      //   pixi.scale.set(transform.scale.x, transform.scale.y)
      // })

      //this.publish('&sys_error', 'hi');
      //next();
    }
}

export default Pixi_Transform_System;