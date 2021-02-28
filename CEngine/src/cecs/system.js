class System_Base {
    constructor(){
        this.targetComponents = [];
        this.excludeComponents = [];
        this._order = 1;
        this._taggedEntityList = new Map();
        this._parent = null;
    }

    subscribe(event, payload){
        this._parent.event.subscribe(event, payload.bind(this));
    }

    publish(event, payload){
        this._parent.event.publish(event, payload);
    }

    publishImmediate(event, payload){
        this._parent.event.publishImmediate(event, payload);
    }

    init(){}

    // called once per loop
    update({}, next){ next();}

    get cachedEntities(){
        return this._taggedEntityList;
    }

    onCreate(){}

    _registerEntityTag(entityRef){
        this._taggedEntityList.set(entityRef.UUID, entityRef);
    }

    _unregisterEntity(entityId){
        this._taggedEntityList.delete(entityId);
    }

    _checkfortaggedEntity(entityID){
        this._taggedEntityList.has(entityID)
    }



}

export default System_Base;