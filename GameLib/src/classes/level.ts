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
    particlEmitters:  Emitter[];

    constructor(mapData){
        this.entities = [];
        this.map = [];
        this.mapData = mapData;
        this.particlEmitters = [];


        this.loadMap(mapData);
    }

    loadMap(map){
        if(map.tiledversion){
            console.log(map)
            let h = map.tilehieght;
            let w = map.tilewidth;
            let mapWidth = map.width;
        } else {
            console.log(map)
            map.forEach((row, y) => {
             row.forEach((tile, x) => {
                 this.map.push(new Tile(x*this.mapData.size[0], y*this.mapData.size[1], this.mapData.size[0], this.mapData.size[1], tile, 'custom'))
             })
            })
        }
    }

    update(deltaTime) {
        this.entities.forEach(entity =>{
            entity.update(deltaTime);
        })
        this.particlEmitters.forEach(emitter => emitter.update(deltaTime));
    }

    draw(deltaTime, totalTime, renderer, camera) {
       this.map.forEach(tile => renderer.drawTile({...tile, spriteSheet: this.mapData.sheet}, totalTime, camera)) ;
       this.entities.forEach(entity => renderer.drawSprite(entity, totalTime, camera));
       this.particlEmitters.forEach( e => e.getParticles().forEach(particle => renderer.drawParticle(particle, camera, totalTime)))
    }

    addEntity(entity){
        this.entities.push(entity);
    }

    addParticleEmitter(sheet, x, y){
        this.particlEmitters.push(
            new Emitter(x, y, 1, 1, 5,
            {
                w: 16,
                h: 16,
                maxLife: 4,
                xVel:  -5,
                movement: {
                    x: (x, v) => x + v,
                    y: (y, v) => y 
                },
                color: 'blue',
                opacity: 1,
                spriteSheet: sheet,
                map: {
                    x: (x, w) => x + w/2,
                    y: y => y
                }
            }))
    }
}

export default Level;