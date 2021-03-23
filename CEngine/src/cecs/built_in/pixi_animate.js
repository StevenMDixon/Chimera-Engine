import System from '../system';

class Pixi_Animate extends System {
    constructor(){
      super();
      this.targetComponents = ["Pixi", "PixiAnimations"];
      this.excludeComponents = [];
    }
    update(next, dt){
      //this.cachedEntities.forEach((entity) => {
        //const {pixi} = entity.components.get('Pixi');
        //pixi.update(dt);
     // })
     for(const [i, entity] of this.cachedEntities){
        //const transform = entity.components.get('Transform');
        const {pixi} = entity.components.get('Pixi');

        if(!pixi.playing){
          //pixi.play();
        }
    }
    }
}

export default Pixi_Animate;