import System from '../system';

class mp extends System {
    constructor(){
      super();
      this.targetComponents = ["Matter", "Pixi"];
    }
    update(entities, next){
      console.log(entities)
      next();
    }
}

export default mp;