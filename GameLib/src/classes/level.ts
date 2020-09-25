import Entity from './entity';
import Tile from './tile';
import map from '../modules/controllerMapping';


class Level {
    entities: Entity[];
    map: Tile[];
    mapData: {
        size: number[],
        map: number[],
        sheet: string
    }

    constructor(mapData){
        this.entities = [];
        this.map= [];
        this.mapData = mapData;
        this.loadMap(mapData.map);
    }

    loadMap(map){
       map.forEach((row, y) => {
        row.forEach((tile, x) => {
            this.map.push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile))
        })
       })
    }

    update(deltaTime) {
        this.entities.forEach(entity =>{
            entity.update(deltaTime);
        })
    }

    draw(deltaTime, renderer, camera) {
       this.map.forEach(tile => renderer.drawTile({...tile, spriteSheet: this.mapData.sheet}, deltaTime, camera)) ;
       this.entities.forEach(entity => renderer.drawSprite(entity, deltaTime, camera))   
    }

    addEntity(entity){
        this.entities.push(entity);
    }
}

export default Level;