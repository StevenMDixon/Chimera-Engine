import System from '../system';

class Pixi_Animate extends System {
    constructor(){
      super();
      this.targetComponents = ["Pixi", "PixiAnimations"];
      this.excludeComponents = [];
    }
    update(next, dt){
      this.cachedEntities.forEach((entity) => {
        //const {pixi} = entity.components.get('Pixi');
        //pixi.update(dt);
      })
      next();
    }
}

export default Pixi_Animate;