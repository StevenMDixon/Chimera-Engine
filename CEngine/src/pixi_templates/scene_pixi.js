import Scene from '../utils/Scene';

class PixiScene extends Scene{
    constructor(name, {PIXI, GlobalStore, Event, Entities}){
        super(name, {GlobalStore, Event, Entities});
        // built in PIXI related items
        this._global.Loader = PIXI.Loader
        this._global.PIXI = PIXI;
        this._stage = new PIXI.Container();
        this._loader = new PIXI.Loader();

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


    get stage() {
        return this._stage;
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