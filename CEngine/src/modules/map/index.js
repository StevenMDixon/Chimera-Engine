class MapManager{
    constructor(){
        this.spriteSheets = new Map();
        this.maps = new Map();
    }

    getMap(mapName){
        return this.maps.get(mapName)
    }

    loadSpriteSheet(spriteSheetData, type, fileName){
        const spriteSheet = [];

        if(type == 'tiled'){
            const {tileheight, tilewidth, margin, spacing, tilecount, columns, name, image} = spriteSheetData;

            for(let i = 0; i < tilecount; i++){
                spriteSheet.push({
                    id: i + 1,
                    spriteSheet: name,
                    source: image,
                    location: {
                        x: margin + ((i%columns) *tilewidth) + ((i%columns) * spacing),
                        y: margin + (Math.floor(i/(columns))*tileheight) + (Math.floor(i/(columns)) * spacing),
                        w: tilewidth,
                        h: tileheight
                    }
                });
            }

            //check for animations and other features
            if(spriteSheetData.tiles){
                spriteSheetData.tiles.forEach(tile => {
                    if(tile.animation){
                        spriteSheet[tile.id].animation = tile.animation.reduce((acc, cur) => {
                            acc.push({
                                ...cur,
                                location: spriteSheet[cur.tileid].location
                            })
                            return acc;
                        }, [])
                        //{...tile.animation, location: spriteSheet}
                    }
                    if(tile.objectgroup){
                        // @todo
                        spriteSheet[tile.id].collisionBox = tile.objectgroup.objects;
                    }
                    if(tile.properties){
                        tile.properties.forEach(property =>{
                            spriteSheet[tile.id][property.name] = property.value;
                        })
                    }
                })
            }
        } else {
            // @Todo handle loading other sprite sheets?
        }

        // handle setting name of sprite sheet if loading by itself filename is required
        this.spriteSheets.set(fileName, spriteSheet);
        return spriteSheet;
    }

    loadMapFromJSON(JSON, name){
        // handle loading embedded tileset
        if(JSON.tiledversion){
            // tiled uses start gid for maps that use multiple spritesheets
            // we need a reference to which
            const sheetRef = [];

            if(JSON.tilesets){
                JSON.tilesets.forEach(spriteSheet => {
                    // sprite sheet is not loaded, load sprite sheet using name
                    if(spriteSheet.name){
                        this.loadSpriteSheet(spriteSheet, 'tiled', spriteSheet.name);
                        sheetRef.push(
                            {
                                name: spriteSheet.name,
                                first: spriteSheet.firstgid,
                                last: spriteSheet.tilecount + spriteSheet.firstgid -1
                            }
                        )
                    }
                    // sprite sheet should already be loaded
                    else if (spriteSheet.source){
                        if(!this.spriteSheets.has(spriteSheet.source)){
                            //throw error();
                        } else {

                        }
                    }

                });
            }
            // handle tile loading for Tiled
            const {tileheight, tilewidth, layers} = JSON;

            let l = layers.map(layer =>{
                return {
                    layer: layer.name,
                    properties: layer.properties.reduce((propObj, item)=>{
                        return {...propObj, [item.name]: item.value}
                    }, {}), 
                    data: this._loadTiledLayer(layer, tilewidth, tileheight, sheetRef)
                }
            })
            
            this.maps.set(name,l);
        }
        //@Todo create loaders for different types of map
        return this.maps;
    }

    _loadTiledLayer(layer, width, height, sheetMapping){
        let data = [];

        if(layer.type == 'tilelayer' && layer.chunk){
            // @todo write chunk loader for infinite maps
            // data = layerData.chunks.reduce((tiles, chunk)=> {
            //     return [...tiles, ...this._loadTileChunked(chunk, width, height)]
            // }, [] );
        }

        else if(layer.type == 'tilelayer' && !layer.chunk){
            // @todo
            for(let i = 0; i < layer.data.length; i++){
                if((layer.data[i] & 0x0fffffff) > 0){
                    let x = (i % layer.width) * width;
                    let y = Math.floor(i / layer.width) * height;
                    data.push(this.loadTile(layer.data[i], x, y, sheetMapping));
                }
            }
        }

        else if(layer.type == 'objectGroup' && !layer.chunk){
            // @todo
        }
        return data;
    }

    loadTile(tileData, x, y, sheetMapping){
        const {sheet, id} = this._mapTileDataToSheet(tileData & 0x0fffffff, sheetMapping);
        const spriteSheet = this.spriteSheets.get(sheet);
        const tile = {...spriteSheet[id]};
        tile.position = {
            x: x,
            y: y,
            rotation: 0,
            scale: 1
        }
        return tile;
    }

    _mapTileDataToSheet(tileID, sheetMapping){
        let t = {}
        for(let i = 0; i < sheetMapping.length; i ++){
            if(tileID <= sheetMapping[i].last && tileID >= sheetMapping[i].first){
                t = {sheet: sheetMapping[i].name, id: tileID - sheetMapping[i].first}
                break;
            }
        }
        return t;
    }



    // _loadTiledChunked(chunk){
    //     let {x, y, data, width} = chunk;
    //     create temporary storage
    //     const tiles = [];
    //     let iy = 0;
    //     loop through tiles in data chunk
    //     for (let i = 0; i <= data.length; i++){
    //         iy = Math.floor(i/width);
    //         if(data[i] -1 >= 0){
    //             console.log(this.spriteSheets.get())
                // let t = [
                //     new c.Renderable(),
                //     new c.Position(i%width*tilew + (x*tilew), iy*tileh + (y*tileh)),
                //     new c.Size(tilew, tileh),
                //     new c.Tile(data[i] -1, 'tiled'),
                //     new c.Sprite(ss),
                //     new c.zIndex(1)
                // ]
                // let cd = SpriteSheet.getCustomProperties(ss, data[i] -1);
                // cd.forEach(component => {
                //     if(c[component.name]){
                //         t.push(new c[component.name](parseJsonInput(component.value)));
                //     }
                // })
                //tiles.push(t);
    //         }
    //     }
    //     return tiles;
    // }
}


export default new MapManager();

// const flags = {
//     diagonal: 0x20000000,
//     horizontal: 0x80000000,
//     vertical: 0x40000000,
//   };

//   // Resolved flags for an easier use of the flags above
//   const resolved = {
//     // Left rotation is diagonal + vertical
//     left: flags.diagonal + flags.vertical,
//     // Right rotation is horizontal + diagonal
//     right: flags.horizontal + flags.diagonal,
//     // Top rotation is horizontal + vertical
//     top: flags.horizontal + flags.vertical,
//   }

  // 0x80000000 90  1610612738
  // 0x40000000 -90 2684354561
  // 0x20000000 180 3221225473

// 1073741826, 1610612738, 2684354562

// Rot 90 = 0xA0000000,
// Rot 180 = 0xC0000000,
// Rot 270 = 0x60000000,
// Flip Y = 0x40000000,
// Flip X = 0x80000000,
// Flip Y & Rot90 = 0x20000000,
// Flip X & Rot90 = 0xE0000000,