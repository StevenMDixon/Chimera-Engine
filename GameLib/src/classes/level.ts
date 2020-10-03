import Entity from './entity';
import Emitter from './emitter';
import Tile from './tile';


class Level {
    entities: Entity[];
    map: Tile[];
    mapData: {
        size: number[],
        map: number[],
        sheet: string,
    }
    tileLayers: {
        [key: string]: Tile[];
    }
    spriteSheet: string;

    constructor(mapData, spriteSheet?){
        this.entities = [];
        this.map = [];
        this.mapData = mapData;
        this.tileLayers = {};
        this.spriteSheet = spriteSheet;

        this.loadMap(mapData);
    }

    loadMap(map){
        if(map.tiledversion){
            let h = map.tileheight;
            let w = map.tilewidth;
            
            map.layers.forEach(layer => this.loadLayer(layer, w, h))
        } else {
            map.forEach((row, y) => {
             row.forEach((tile, x) => {
                 this.map.push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile, 'custom'))
             })
            })
        }
    }

    // loads different layer types from tiled
    loadLayer(layer, w, h){
        if(layer.type == 'tilelayer' && layer.name !== 'Entity'){
            this.tileLayers[layer.name] = layer.chunks.reduce((tiles, chunk)=> {
                return [...tiles, ...this.loadChunk(chunk, w, h)]
            }, [] )
        } else if (layer.type == 'tilelayer' && layer.name == 'Entity'){

        } else if (layer.type == 'objectgroup'){

        }
        
    }

    // loads chunked data from tiled
    loadChunk(chunk, tilew, tileh){
        let {x, y, data, width} = chunk;
        let tiles = [];
        let iy = 0;
        for (let i = 0; i <= data.length; i++){
            iy = Math.floor(i/width)
            if(data[i] -1 >= 0){
                tiles.push(new Tile(
                    i%width*tilew + (x*tilew),
                    iy*tileh + (y*tileh), 
                    tilew, 
                    tileh, data[i] -1, 'tiled'))
            }
        }

        return tiles
    }

    update(deltaTime) {
        this.entities.forEach(entity =>{
            entity.update(deltaTime);
        });
    }

    draw(deltaTime, totalTime) {
       if(Object.keys(this.tileLayers).length > 0){
            if(this.tileLayers.Ground){
                this.tileLayers.Ground.forEach(tile => renderer.drawTile({...tile, spriteSheet: this.spriteSheet}, totalTime, camera));
            }
            //draw all entities
            this.entities.forEach(entity => renderer.drawSprite(entity, totalTime, camera));
        
            Object.keys(this.tileLayers).forEach(layer => {
                if(layer !== 'Entity' && layer !== 'Ground'){
                    this.tileLayers[layer].forEach(tile => renderer.drawTile({...tile, spriteSheet: this.spriteSheet}, totalTime, camera));
                }
            })
       } else {
        this.map.forEach(tile => renderer.drawTile({...tile, spriteSheet: this.mapData.sheet}, totalTime, camera));
        this.entities.forEach(entity => renderer.drawSprite(entity, totalTime, camera));
       }
    }

    addEntity(entity){
        this.entities.push(entity);
    }
}

export default Level;