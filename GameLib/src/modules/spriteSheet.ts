import {createAnimation, createTiledAnimation} from './animation';

class SpriteSheet {
    data: any;
    image: any;
    tiles: any;
    animations: any;
    offset: number;
    type: string;

    constructor(data, type){
        this.image = null;
        this.data = data;
        this.tiles = new Map();
        this.animations = new Map();
        this.offset = 0;
        this.type = type;

        this.setup(data);
    }

    setup(data){
        
        if(data.spec && this.type == 'custom'){
            if(data.spec.offset){
                this.offset = data.spec.offset;
            }
        }
        // check for frames
        if(data.frames && this.type == 'custom'){
            data.frames.forEach(tile => {
                this.tiles.set(tile.name, 
                    {x: tile.rect[0] + (tile.rect[0]/ tile.rect[2] * this.offset) ,
                    y:tile.rect[1] + (tile.rect[1]/ tile.rect[3] * this.offset),
                    w: tile.rect[2],
                    h: tile.rect[3]
                })
            })
        }

        //check for animations
        if(data.animations && this.type == 'custom'){
            data.animations.forEach(animation => {
                this.animations.set(animation.name, createAnimation(animation.frames, animation.frameLen));
            })
        }

        if(this.type == 'tiled'){
            const {tileheight, tilewidth, margin, spacing, tilecount, columns} = this.data;
            let iy = 0;
            for(let i = 0; i < tilecount; i++){
                
                this.tiles.set(i, {
                    x: margin + ((i%columns) *tilewidth) + ((i%columns) * spacing),
                    y: margin + (iy*tileheight) + (iy * spacing),
                    w: tilewidth,
                    h: tileheight,
                    components: []
                })
                iy = Math.floor(i/(columns-1))
            }

           
            //tiled stores animations under the tiles section
            if(data.tiles){
                this.data.tiles.forEach(anim => {
                    if(anim.animation){
                        this.animations.set(
                            anim.id,
                            createTiledAnimation(anim.animation, anim.properties)
                        )
                    }

                    if(anim.properties){
                        let n = this.tiles.get(anim.id);
                        anim.properties.forEach(prop => {
                            prop.value = prop.value.split(',');
                            n.components.push(prop)
                        })
                        this.tiles.set(anim.id, n)
                    }
                })
            }
        }
        this.image = data.name;
    }

    resolveSpriteData(name, time){
        if(this.animations.get(name)){
            let anim = this.animations.get(name);
            return {sprite: this.tiles.get(anim(time)), imageName: this.image};
        }else {
            return {sprite: this.tiles.get(name), imageName: this.image};
        }
    }

    resolveTileData(index, time){
        let imageName = '';
        if(this.type == 'tiled'){
            imageName = index;
        }else {
            imageName = this.data.map[index];
        }
        if(this.animations.get(imageName)){
            let anim = this.animations.get(imageName);
            return {tile: this.tiles.get(anim(time)), imageName: this.image};
        }else {
            return {tile: this.tiles.get(imageName), imageName: this.image};
        }
    }

    hasItem(item){
        return this.tiles.has(item);
    }

    resolveItemComponents(id){
        return this.tiles.get(id).components
    }
}


class SpriteSheet_Factory{
    _sheets: {
        [key: string]: SpriteSheet
    };
    constructor(){
        this._sheets = {};
    }
    create(sheets){
        sheets.forEach(sheet => {
            if(sheet.tiledversion){
                // this is a tile sheet from tiled
                this._sheets[sheet.name] = new SpriteSheet(sheet, 'tiled');
            }else {
                this. _sheets[sheet.name] = new SpriteSheet(sheet, 'custom');
            }
        })

    }
    resolve(name){
        return this._sheets[name];
    }
    checkItem(name, item){
        return this._sheets[name].hasItem(item)
    }
    getCustomProperties(name, item){
        return this._sheets[name].resolveItemComponents(item) || []
    }
}

export default new SpriteSheet_Factory();
