class Scene {
    constructor(name, {PIXI, GlobalStore, EventSystem, Entities}){
        // built in PIXI related items
        this._stage = new PIXI.Container();
        this._loader = new PIXI.Loader();
        //this.events = EventSystem.create(name);
        this.PIXI = PIXI;
        this._name = name;
        this._entities = Entities.createContext(name);
        this.global = {
            Store: GlobalStore,
            Loader: PIXI.Loader,
            Events: EventSystem
        };

        this.layers = {
            'transition': new PIXI.Container(),
            'effect': new PIXI.Container(),
            'particle2': new PIXI.ParticleContainer(),
            'sprite2': new PIXI.Container(),
            'particle1': new PIXI.ParticleContainer(),
            'sprite1': new PIXI.Container(),
            'bg2': new PIXI.Container(),
            'bg1': new PIXI.Container(),
        };
    }

    _load() {
        // create a store for this instance
        this.store = this.global.Store.createStore(this.name, {});
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

    _getStage(){return this._stage};

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

export default Scene;