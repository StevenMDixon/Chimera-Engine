import Entity from './entity';

class Particle extends Entity {
    constructor(x: number, y: number, w: number, h: number, rotation: number, spriteSheet? : string){
        super(x, y, w, h, rotation, '', 'circle');
    }
}