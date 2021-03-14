import Scene from '../utils/Scene';

class PixiScene extends Scene{
    constructor(name){
        super(name);
        // built in PIXI related items
        // this._global.Loader = PIXI.Loader
        // this._global.PIXI = PIXI;
        // this._stage = new PIXI.Container();
        // this._loader = new PIXI.Loader();

        this._layers = {}; // define layers for pixi
    }

    get loader(){
        const {loader} = this._store.data;
        return loader;
    }

    get stage() {
        const {stage} = this._store.data;
        return stage;
    }

    get PIXI(){
        const {PIXI} = this._store.data;
        return PIXI;
    }

    _addPixiData(PIXI){
        this._store.set({
            PIXI,
            stage: new PIXI.Container(),
            loader: new PIXI.Loader()
        });
    }

    _load() {
        // preload user defined data
        this.preload();
        // create onload to listen for onload event
        this.loader.load((loader, resources) => this.setup(loader, resources));
        // make this scenes stage able to sort child containers
        this.stage.sortableChildren = true;
    }

    createLayer(name, zIndex, toAdd){
        const {stage} = this.store.data;
        if(this._layers[name]){
            //@todo add error handling for layers that already exist
            return
        }
        this._layers[name] = new this.PIXI.Container();
        this._layers[name].zIndex = zIndex;
        if(toAdd){
            this._layers[name].addChild(toAdd);
        }
        //add the new layer to the stage
        stage.addChild(this._layers[name]);
    } 

    addToLayer(name, object){
        this._layers[name].addChild(object);
    }

    loadMap(mapName, ...fn){
        const {world} = this.store.data;
        const map = this.map.maps.get(mapName);
        const components = this.store.data.global.managers.ECSManager.getComponentsList();
        map.forEach(layer => {
            const {name, properties} = layer;
            // create layer if it does not exits
            if(!this._layers[name]){
                this.createLayer(name, properties.zindex || 0);
            }
            for(const item of layer.data) {
                const {position} = item;
                const composed = [];
                // add new transform location
                composed.push(new components.Transform(position.x, position.y, position.rotation, position.scale));
                // this is the pixi instance so we know we have access to pixi
                // check if there any animations on the tile
                const mappedPixiItems = this._mapPixiLoader(item, components);
                composed.push(...mappedPixiItems);
                //check if pixi exist at the end of the mapped pixi components
                if(mappedPixiItems[mappedPixiItems.length - 1].pixi){
                    // add the pixi item to the world
                    this.addToLayer(name, mappedPixiItems[mappedPixiItems.length - 1].pixi);
                }

                // let user define functions needed when loading map
                fn.forEach(mappedFunction => composed.push(mappedFunction(item, components))); 

                world.composeEntity(composed);
            }
        })
    }

    _mapPixiLoader({animation, location, position, spriteSheet}, components){
        const composedComponents = [];
        let PIXItem = null;
        const {PIXI, global} = this.store.data;
        const pSheet = new PIXI.BaseTexture.from(global.loader.resources[spriteSheet].url);
        if(animation){
            // handle animated pixi items 
            const animatedSheet = animation.map(anim => new PIXI.Texture(pSheet, new PIXI.Rectangle(anim.location.x, anim.location.y, anim.location.w, anim.location.h)));
            PIXItem = new PIXI.AnimatedSprite(animatedSheet);
            PIXItem.animationSpeed = .1;
            PIXItem.loop = true;
            PIXItem.play();

            composedComponents.push(new components.PixiAnimations(animatedSheet));
        }else {
            // handle nonAnimated pixi items
           PIXItem = new this.PIXI.Sprite(new PIXI.Texture(pSheet, new PIXI.Rectangle(location.x, location.y, location.w, location.h)));
        }
        if(PIXItem){
            PIXItem.x = position.x;
            PIXItem.y = position.y;
            PIXItem.rotation = position.rotation;

            composedComponents.push(new components.Pixi(PIXItem));
        }
        //const 
        return composedComponents;
    }
}

export default PixiScene;