class Scene {
    constructor(name, {PIXI, GlobalStore}){
        // built in PIXI related items
        this.stage = new PIXI.Container();
        this.loader = new PIXI.Loader();
        this.PIXI = PIXI;
        this.sprites = {};
        this.name = name;
        this.GlobalStore = GlobalStore;
        this.GlobalLoader = PIXI.Loader;
        this.layers = {
            'transition': new PIXI.Container(),
            'effect': new PIXI.Container(),
            'sprite2': new PIXI.Container(),
            'sprite1': new PIXI.Container(),
            'bg2': new PIXI.Container(),
            'bg1': new PIXI.Container(),
        }
    }

    _load() {
        // create a store for this instance
        this.store = this.GlobalStore.createStore(this.name, {});
        // preload user defined data
        this.preload();
        // create onload to listen for onload event
        this.loader.load((loader, resources) => this.setup(loader, resources));
        // make this scenes stage able to sort child containers
        this.stage.sortableChildren = true;
        // loop through children and add them to the stage
        Object.keys(this.layers).forEach((item, i) => {
            this.layers[item].zIndex = -i;
            this.stage.addChild(this.layers[item]);
        })
    }

    preload(){}

    setup(loader, resources){}

    getStage(){return this.stage};

    createLayer(name, zIndex, toAdd){
        if(this.layers[name]){
            //@todo add error handling for layers that already exist
            return
        }
        this.layers[name] = new this.PIXI.Container();
        this.layers[name].zIndex = zIndex;
        this.layers[name].addChild(toAdd);
        //add the new layer to the stage
        this.stage.addChild(this.layers[name]);
    } 
}

export default Scene;