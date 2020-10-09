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
                let t = new GameObject();
                t.addComponent(new c.Renderable());
                t.addComponent(new c.Position(x*this.mapData.size[0], y*this.mapData.size[1]));
                t.addComponent(new c.Size(this.mapData.size[0], this.mapData.size[1]));
                t.addComponent(new c.Tile(tile, 'custom'));
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
            items = loadObjects(layer.objects, layer.name, components);
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
            let t = new GameObject();
            t.addComponent(new c.Renderable());
            t.addComponent(new c.Position(i%width*tilew + (x*tilew), iy*tileh + (y*tileh)));
            t.addComponent(new c.Size(tilew, tileh));
            t.addComponent(new c.Tile(data[i] -1, 'tiled'));
            t.addComponent(new c.Sprite(ss));
            t.addComponent(new c.zIndex(1));
            let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
            cd.forEach(component => {
                if(c[component.name]){
                    t.addComponent(new c[component.name](...component.value));
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
            t.addComponent(new c.Renderable());
            t.addComponent(new c.Position(i%width*w + (x*w),iy*h + (y*h)));
            t.addComponent(new c.Size(w, h));
            t.addComponent(new c.Sprite(ss));
            t.addComponent( new c.Entity(data[i] -1, 'tiled'));
            t.addComponent(new c.zIndex(2));
            
            let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
            cd.forEach(component => {
                if(c[component.name]){
                    t.addComponent(new c[component.name](...component.values));
                }
            })

            tiles.push(t);
        }
    }
    return tiles
}

function loadObjects(objects, type, components){
    return objects.map(object => {
        let t = new GameObject();   
        if(object.polygon){
            t.addComponent(new components.Polygon(object.polygon));
            t.addComponent(new components.Renderable());
            t.addComponent(new components.Position(object.x, object.y));
            t.addComponent(new components.zIndex(3));
        }else {
            t.addComponent(new components.Renderable());
            t.addComponent( new components.Position(object.x, object.y));
            t.addComponent(new components.Size(object.width, object.height));
            t.addComponent(new components.Size(object.width, object.height));
            t.addComponent(new components.zIndex(3));
        }
        if(object.properties){
            object.properties.forEach(prop => {
                if(components[prop.name]){
                    t.addComponent(new components[prop.name](...prop.value.split(',')));
                }
            })
            
        }

        return t
    })
}