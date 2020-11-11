import GameObject from '../components/gameObject';
import Components from '../components/components';
import SpriteSheet from './spriteSheet';


export function loadMap(map, ss = 'player'): GameObject[]{
    let items = [];
    let c = Components.getComponents();

    if(map.tiledversion){
        const {tileheight, tilewidth, layers} = map;
        layers.forEach(layer => {
            items = [...items, ...loadLayer(layer, tilewidth, tileheight, c, ss)]
        })
    } else {
        let c = Components.getComponents();
        map.forEach((row, y) => {
            row.forEach((tile, x) => {
                let t = [
                    new c.Renderable(),
                    new c.Position(x*this.mapData.size[0], y*this.mapData.size[1]),
                    new c.Size(this.mapData.size[0], this.mapData.size[1]),
                    new c.Tile(tile, 'custom'),
                ]
                //this.tileLayers['Ground'].push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile, 'custom'))
                items.push(t);
            })
        })
    }
    return items;
}

    // loads different layer types from tiled
function loadLayer(layer, w, h, components, ss){
        let items = [];
        if(layer.type == 'tilelayer' && layer.name !== 'Entity'){
           let i  = layer.chunks.reduce((tiles, chunk)=> {
                return [...tiles, ...loadTileChunk(chunk, w, h, components, ss)]
            }, [] );
            items = i;
        }
        //
        if(layer.type == 'tilelayer' && layer.name == 'Entity'){
            let i  = layer.chunks.reduce((items, chunk)=> {
                 return [...items, ...LoadEntityChunk(chunk, w, h, components, ss)]
             }, [] );
             items = i;
         }

        //@Todo Define object loading
        if(layer.type == 'objectgroup'){
            if(layer.name == 'Collisions'){
                items = loadObjects(layer.objects, layer.name, components);
            }else if(layer.name == 'Entity'){
                items = LoadEntityObjects(layer.objects, layer.name, components, ss);
            }
         }
        
        return items
}

// loads chunked data from tiled
function loadTileChunk(chunk, tilew, tileh, c, ss){
    let {x, y, data, width} = chunk;
    let tiles = [];
    let iy = 0;
    for (let i = 0; i <= data.length; i++){
        iy = Math.floor(i/width)
        if(data[i] -1 >= 0){
            let t = [
                new c.Renderable(),
                new c.Position(i%width*tilew + (x*tilew), iy*tileh + (y*tileh)),
                new c.Size(tilew, tileh),
                new c.Tile(data[i] -1, 'tiled'),
                new c.Sprite(ss),
                new c.zIndex(1)
            ]
            let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
            cd.forEach(component => {
                if(c[component.name]){
                    t.push(new c[component.name](parseJsonInput(component.value)));
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
            let t = [
                new c.Renderable(),
                new c.Position(i%width*w + (x*w),iy*h + (y*h)),
                new c.Size(w, h),
                new c.Sprite(ss),
                new c.Entity(data[i] -1, 'tiled'),
                new c.zIndex(2),
            ]
            let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
            cd.forEach(component => {
                if(c[component.name]){ 
                    t.push(new c[component.name](parseJsonInput(component.value)));
                }else{}
            })
            tiles.push(t);
        }
    }
    return tiles
}

function loadObjects(objects, type, components){
    return objects.map(object => {
        let t = [];   
        if(object.polygon){
            object.polygon = object.polygon.map(poly => {
                return {x: poly.x + object.x, y: poly.y + object.y}
            })

            t.push(new components.Polygon(object.polygon));
            t.push(new components.Renderable());
            t.push(new components.Position(object.x, object.y));
            t.push(new components.zIndex(3));
        }else {
            t.push(new components.Renderable());
            t.push( new components.Position(object.x, object.y));
            t.push(new components.Size(object.width, object.height));
            t.push(new components.zIndex(3));
        }
        if(object.properties){
            object.properties.forEach(prop => {
                if(components[prop.name]){
                    t.push(new components[prop.name](parseJsonInput(prop.value)));
                }
            })
        }

        return t
    })
}

function LoadEntityObjects(objects, type, components, ss){
    return objects.map(object => {
        let t = []; 
        if(object.gid >= 0){
            t.push(new components.Sprite(ss));
            t.push( new components.Entity(object.gid - 1, 'tiled'));
        }
        t.push(new components.Position(object.x, object.y - object.height));
        t.push(new components.Size(object.width, object.height));
        t.push(new components.zIndex(2));
        if(object.properties){
            object.properties.forEach(prop => {
                if(components[prop.name]){  
                    t.push(new components[prop.name](parseJsonInput(prop.value)));
                }
            })
        }
        return t
    })
}   

function parseJsonInput(input){
    //console.log(input)
    let v = {};
    try {
        v = JSON.parse(input) 
    } catch(e){
        //console.log(e)
    }
    return v
}