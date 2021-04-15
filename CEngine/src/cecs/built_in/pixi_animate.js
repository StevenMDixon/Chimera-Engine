import System from '../system';

class Pixi_Animate extends System {
    constructor(){
      super();
      this.targetComponents = ["Pixi", "PixiStaticAnimations"];
      this.excludeComponents = [];
    }
    update(h, dt){
      //this.cachedEntities.forEach((entity) => {
        //const {pixi} = entity.components.get('Pixi');
        //pixi.update(dt);
      // })
     for(const [i, entity] of this.cachedEntities){
        const {pixi} = entity.components.get('Pixi');
        // if(!pixi.playing){
        //   pixi.play();
        // }
        pixi.update(dt/100);
    }
    }
}

export default Pixi_Animate;