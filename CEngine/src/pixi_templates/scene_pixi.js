class PixiScene {
    constructor(name, {PIXI, GlobalStore, Event, Entities}){
        this._global = {
            Store: GlobalStore,
            Loader: PIXI.Loader,
            Event: Event,
            PIXI: PIXI
        };
        // built in PIXI related items
        this._stage = new PIXI.Container();
        this._loader = new PIXI.Loader();
        //this.events = EventSystem.create(name);
        this._name = name;
        this._world = Entities.createContext(name, this);
        this._store = this._global.Store.createStore(name, {});
        this._event = this._global.Event.createEventHandler(name);
        this.layers = {
            transition: new PIXI.Container(),
            effect: new PIXI.Container(),
            particle2: new PIXI.ParticleContainer(),
            sprite2: new PIXI.Container(),
            particle1: new PIXI.ParticleContainer(),
            sprite1: new PIXI.Container(),
            bg2: new PIXI.Container(),
            bg1: new PIXI.Container(),
        };

        //@todo implement maps?
        this._maps = {}
        this.currentMap = null;
    }

    get store(){
        return this._store;
    } 

    get world() {
        return this._world;
    }

    get stage() {
        return this._stage;
    }

    get global(){
        return this._global;
    }

    get PIXI(){
        return this._global.PIXI;
    }

    _load() {
        // preload user defined data
        this.preload();
        // create onload to listen for onload event
        this._loader.load((loader, resources) => this.setup(loader, resources));
        // make this scenes stage able to sort child containers
        this._stage.sortableChildren = true;
        // loop through children and add them to the stage
        Object.keys(this.layers).forEach((item, i) => {
            this.layers[item].zIndex = -i;
            this._stage.addChild(this.layers[item]);
        })
    }

    preload(){} // user defined

    setup(loader, resources){} // user defined

    update(dt){} // user defined

    createLayer(name, zIndex, toAdd){
        if(this.layers[name]){
            //@todo add error handling for layers that already exist
            return
        }
        this.layers[name] = new this.PIXI.Container();
        this.layers[name].zIndex = zIndex;
        this.layers[name].addChild(toAdd);
        //add the new layer to the stage
        this._stage.addChild(this.layers[name]);
    } 
}

export default PixiScene;