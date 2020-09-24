import Entity from './entity';
import Tile from './tile';
import map from './controllerMapping';


class Level {
    enitities: Entity[];
    map: Tile[];
    mapData: {
        size: number[],
        map: number[],
        sheet: string
    }

    constructor(mapData){
        this.enitities = [];
        this.map= [];
        this.mapData = mapData;
        this.loadMap(mapData.map);
    }

    loadMap(map){
       map.forEach((row, x) => {
        row.forEach((tile, y) => {
            this.map.push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile))
        })
       })
    }

    update(deltaTime) {
        this.enitities.forEach(entity =>{
            entity.update(deltaTime);
        })
    }

    draw(deltaTime, renderer) {
       this.map.forEach(tile => renderer.drawTile({...tile, spriteSheet: this.mapData.sheet}))     
    }

    addEntity(entity){
        this.enitities.push(entity);
    }
}

export default Level;