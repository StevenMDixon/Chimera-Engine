import Tile from './tile';

class Level {
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
            this.tileLayers['Ground'] = []
            map.forEach((row, y) => {
             row.forEach((tile, x) => {

                this.tileLayers['Ground'].push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile, 'custom'))
             })
            })
        }
    }

    // loads different layer types from tiled
    loadLayer(layer, w, h){
        if(layer.type == 'tilelayer' && layer.name !== 'Entity'){
            this.tileLayers[layer.name] = layer.chunks.reduce((tiles, chunk)=> {
                return [...tiles, ...this.loadChunk(chunk, w, h)]
            }, [] );
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
}

export default Level;