import Particles from './particle';
import Entity from './entity';
declare class Emitter {
    particles: Particles[];
    x: number;
    y: number;
    h: number;
    w: number;
    particleLimit: number;
    maxLife: number;
    sprite: string;
    shape: string;
    options: {
        [key: string]: any;
    };
    movement: any;
    attachment: Entity;
    generate: (i: any) => {};
    kill: (Particle: any) => {};
    constructor(x: number, y: number, w: number, h: number, limit: number, options: object, generate?: any, kill?: any);
    update(dt: any): void;
    getParticles(): Particles[];
    attach(entity: any): void;
}
export default Emitter;
