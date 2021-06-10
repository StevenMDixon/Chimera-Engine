import Scene from '../modules/scene/scene';
import {components} from '../modules/ecs/index';
import {createVertices, createVerticesFromSize} from '../libs/utils';
import Vector from '../libs/vectors';

class PixiScene extends Scene{
    constructor(name){
        super(name);
        // built in PIXI related items
        // this._global.Loader = PIXI.Loader
        // this._global.PIXI = PIXI;
        this._stage = null;
        this.PIXI = null;
        this._layers = {}; // define layers for pixi
    }
    
    get stage(){
        return this._stage;
    }

    get loader(){
        const {loader} = this.global;
        return loader;
    }

    _addPixiData(PIXI){
        this.PIXI = PIXI,
        this._stage = new PIXI.Container()
    }

    _load() {
        // preload user defined data
        this.preload(); 
        // create onload to listen for onload event
        this.setup(this.loader, this.loader.resources);
        // make this scenes stage able to sort child containers
        this.stage.sortableChildren = true;
    }

    loadActors(actorList, userDefined = []){
        const fns = [
            (data) => this._actorPixiLoader(data),
            ...userDefined
        ]
        if(!actorList) return;
        this.createLayer('actor', 2);
        this._actors.load(actorList, fns);
    }

    loadScripts(scriptLists, userDefined = []){

    }

    createLayer(name, zIndex, toAdd){
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
        this.stage.addChild(this._layers[name]);
    } 

    addToLayer(name, object){
        this._layers[name].addChild(object);
    }

    loadMap(mapName, ...fn){
        const map = this.map.maps.get(mapName);
        const comp = components.getComponents();
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
                composed.push(new comp.Transform(new Vector(position.x, position.y), position.rotation, new Vector(position.scale, position.scale)));
                // this is the pixi instance so we know we have access to pixi
                // check if there any animations on the tile
                const mappedPixiItems = this._mapPixiLoader(item, comp);
                composed.push(...mappedPixiItems);
                //check if pixi exist at the end of the mapped pixi components
                if(mappedPixiItems[mappedPixiItems.length - 1].pixi){
                    // add the pixi item to the world
                    this.addToLayer(name, mappedPixiItems[mappedPixiItems.length - 1].pixi);
                }
                if(item.collisionBoxes){
                    let vertices = null;
                    for(let i = 0; i < item.collisionBoxes.length; i++){
                        if(item.collisionBoxes[i].polygon){
                            vertices = createVertices(item.collisionBoxes[i].polygon)
                        }else if(vertices == null){
                            const {x, y, width, height} = item.collisionBoxes[i]; 
                            vertices = createVerticesFromSize(x, y, width, height);
                        }
                    }
                    if(vertices){
                        composed.push(new comp.System_bounding_box(vertices));
                    }
                    
                }
                // let user define functions needed when loading map
                fn.forEach(mappedFunction => composed.push(mappedFunction(item, comp))); 
                
                this.world.composeEntity(composed);
            }
        })
    }

    _mapPixiLoader({animation, location, position, spriteSheet}, components){
        const composedComponents = [];
        let PIXItem = null;
        const pSheet = new this.PIXI.BaseTexture.from(this.global.loader.resources[spriteSheet].url);
        if(animation){
            // handle animated pixi items 
            const animatedSheet = animation.map(anim => new this.PIXI.Texture(pSheet, new this.PIXI.Rectangle(anim.location.x, anim.location.y, anim.location.w, anim.location.h)));
            PIXItem = new this.PIXI.AnimatedSprite(animatedSheet);
            PIXItem.animationSpeed = .1;
            PIXItem.loop = true;
            //PIXItem.play();
            composedComponents.push(new components.PixiStaticAnimations(animatedSheet));
        }else {
            // handle nonAnimated pixi items
           PIXItem = new this.PIXI.Sprite(new this.PIXI.Texture(pSheet, new this.PIXI.Rectangle(location.x, location.y, location.w, location.h)));
        }
        if(PIXItem){
            PIXItem.x = position.x;
            PIXItem.y = position.y;
            PIXItem.rotation = position.rotation;
            PIXItem.anchor.set(0.5);
            composedComponents.push(new components.Pixi(PIXItem));
        }
        //const 
        return composedComponents;
    }

    _actorPixiLoader(data, layer){
        const composedComponents = [];
        const componentList = components.getComponents();
        let PIXItem = null;

        const {animation} = data;

        // handle animated sprites
        if(animation){
            const {resource, loop, speed, sheets, anchor} = animation;

            const sheet = new this.PIXI.BaseTexture.from(this.global.loader.resources[resource].url);

            let animations = {};

            for(const sheetName in sheets){
                animations[sheetName] = sheets[sheetName].map(({x, y, w, h}) => new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(x, y, w, h)))
            }

            let actorSheet = {
                ...animations,
                _sheet: sheet,
            };

            composedComponents.push(new componentList.PixiAnimations(actorSheet));

            const {position, scale, rotation} = data.transform;

            PIXItem = new this.PIXI.AnimatedSprite(actorSheet[Object.keys(actorSheet)[0]]);
            PIXItem.x = position.x;
            PIXItem.y = position.y;
            PIXItem.loop = loop;
            PIXItem.anchor.set(anchor|| .5);
            PIXItem.animationSpeed = speed || .5;
            PIXItem.rotation = rotation || 0;
            //player.play();
            PIXItem.scale.set(scale.x || 1, scale.y || 1);

            composedComponents.push(new componentList.Pixi(PIXItem));

            this.addToLayer('actor', PIXItem);
        }
        

        
        



        //new Chimera.components.Pixi(player),
        //new Chimera.components.PixiAnimations(playerSheet),
        


        // const pSheet = new this.PIXI.BaseTexture.from(this.global.loader.resources[spriteSheet].url);
        // if(animation){
        //     // handle animated pixi items 
        //     const animatedSheet = animation.map(anim => new this.PIXI.Texture(pSheet, new this.PIXI.Rectangle(anim.location.x, anim.location.y, anim.location.w, anim.location.h)));
        //     PIXItem = new this.PIXI.AnimatedSprite(animatedSheet);
        //     PIXItem.animationSpeed = .1;
        //     PIXItem.loop = true;
        //     //PIXItem.play();

        //     composedComponents.push(new components.PixiStaticAnimations(animatedSheet));
        // }else {
        //     // handle nonAnimated pixi items
        //    PIXItem = new this.PIXI.Sprite(new this.PIXI.Texture(pSheet, new this.PIXI.Rectangle(location.x, location.y, location.w, location.h)));
        // }
        // if(PIXItem){
        //     PIXItem.x = position.x;
        //     PIXItem.y = position.y;
        //     PIXItem.rotation = position.rotation;

        //     composedComponents.push(new components.Pixi(PIXItem));
        // }
        //const 
        return composedComponents;
    }
}

export default PixiScene;