import Entity from './entity';
import Tile from './tile';


class Level {
    enitities: Entity[]
    map: Tile[];

    constructor(mapData){
        this.enitities = [];
        this.map= [];
    
    }

    loadMap(Map){

    }

    update(deltaTime) {
        this.enitities.forEach(entity =>{
            entity.update(deltaTime);
        })
    }

    draw() {

    }

    addEntity(entity){
        this.enitities.push(entity);
    }


}

export default Level;