import System from '../system';

class Pixi_System extends System {
    constructor(){
      super();
      this.targetComponents = ["Transform", "Pixi"];
    }
    update(next){
      console.log(this._cacheList)
      next();
    }
}

export default Pixi_System;