import GameObject from '../components/gameObject';
import Components from '../components/components';
import SpriteSheet from './spriteSheet';
import components from '../components/components';

export function loadMap(map, ss = 'player'): GameObject[]{
    let items = [];
    let c = Components.getComponents();

    if(map.tiledversion){
        const {tileheight, tilewidth} = map;
        items = map.layers.forEach(layer => loadLayer(layer, tilewidth, tileheight, c, ss))
    } else {
        let c = Components.getComponents();
        map.forEach((row, y) => {
            row.forEach((tile, x) => {
                let t = new GameObject();
                t.addComponent('Renderable', new c.Renderable());
                t.addComponent('Position', new c.Position(x*this.mapData.size[0], y*this.mapData.size[1]));
                t.addComponent('Size', new c.Size(this.mapData.size[0], this.mapData.size[1]));
                t.addComponent('Tile', new c.Tile(tile, 'custom'));
                //this.tileLayers['Ground'].push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile, 'custom'))
                items.push(t);
            })
        })
    }
    return items;
}

    // loads different layer types from tiled
function loadLayer(layer, w, h, components, ss){
        const items = [];
        if(layer.type == 'tilelayer' && layer.name !== 'Entity'){
           let i  = layer.chunks.reduce((tiles, chunk)=> {
                return [...tiles, ...loadTileChunk(chunk, w, h, components, ss)]
            }, [] );
            items.push(i);
        }
        //
        if(layer.type == 'tilelayer' && layer.name == 'Entity'){
            let i  = layer.chunks.reduce((items, chunk)=> {
                 return [...items, ...LoadEntityChunk(chunk, w, h, components, ss)]
             }, [] );
             items.push(i);
         }

        //@Todo Define object loading
        // if(layer.type == 'objectgroup'){
        //     layerObjects
        //  }

}

// loads chunked data from tiled
function loadTileChunk(chunk, tilew, tileh, c, ss){
    let {x, y, data, width} = chunk;
    let tiles = [];
    let iy = 0;
    for (let i = 0; i <= data.length; i++){
        iy = Math.floor(i/width)
        if(data[i] -1 >= 0){
            let t = new GameObject();
            t.addComponent('Renderable', new c.Renderable());
            t.addComponent('Position', new c.Position(i%width*tilew + (x*tilew), iy*tileh + (y*tileh)));
            t.addComponent('Size', new c.Size(tilew, tileh));
            t.addComponent('Tile', new c.Tile(data[i] -1, 'tiled'));

            let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
            cd.forEach(component => {
                if(c[component.name]){
                    t.addComponent(component.name, new c[component.name](...component.values));
                }
            })

            tiles.push(t);
        }
    }
    return tiles
}

function LoadEntityChunk(chunk, w, h, c, ss?){
    let {x, y, data, width} = chunk;
    let tiles = [];
    let iy = 0;
    for (let i = 0; i <= data.length; i++){
        iy = Math.floor(i/width)
        if(data[i] -1 >= 0){
            let t = new GameObject();
            t.addComponent('Renderable', new c.Renderable());
            t.addComponent('Position', new c.Position(i%width*w + (x*w),iy*h + (y*h)));
            t.addComponent('Size', new c.Size(w, h));
            t.addComponent('Sprite', new c.Sprite(ss));

            let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
            cd.forEach(component => {
                if(c[component.name]){
                    t.addComponent(component.name, new c[component.name](...component.values));
                }
            })

            tiles.push(t);
        }
    }
    return tiles
}