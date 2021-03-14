class System_Base {
    constructor(){
        this.targetComponents = [];
        this.excludeComponents = [];
        this._order = 1;
        this._taggedEntityList = new Map();
        this._parent = null;
        this._sceneContext = null;
    }

    get cachedEntities(){
        return this._taggedEntityList;
    }

    subscribe(eventData, payload){
        const {event} = this._sceneContext.store.data;
        event.subscribe(eventData, payload.bind(this));
    }

    publish(eventData, payload){
        const {event} = this._sceneContext.store.data;
        event.publish(eventData, payload);
    }

    publishImmediate(eventData, payload){
        const {event} = this._sceneContext.store.data;
        event.publishImmediate(eventData, payload);
    }

    init(){}
    // called once per loop
    update(dt){}

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