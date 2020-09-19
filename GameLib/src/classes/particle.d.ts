import Entity from './entity';
declare class Particle extends Entity {
    life: number;
    current: number;
    lifeState: number;
    color: string;
    opacity: number;
    currentState: number[];
    constructor(x: number, y: number, w: number, h: number, life: number, rotation: number, color: any, opactity: number, spriteSheet?: string, frame?: number, state?: number[]);
    update(x: any, y: any): void;
    reset(x: any, y: any, frame?: any): void;
    getSpriteInfo(): object;
}
export default Particle;
