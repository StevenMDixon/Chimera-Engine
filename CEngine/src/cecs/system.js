class System_Base {
    constructor(){
        this.targetComponents = [];
        this.excludeComponents = [];
        this._order = 1;
        this._cacheList = [];
    }

    init(){}

    update({}, next){ next();}

    _registerEntity(Entity){
        this._cacheList.push(entityRef);
    }

    _unregisterEntity(entityId){
        this._cacheList = this._cacheList.filter(entity => entity.id != entityId)
    }

}

export default System_Base;