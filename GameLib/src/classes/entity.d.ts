declare class Entity {
    x: number;
    y: number;
    w: number;
    h: number;
    rotation: number;
    spriteSheet: string;
    spriteWidth: number;
    spriteHeight: number;
    shape: string;
    state: string;
    frameCount: number;
    currentFrame: number;
    frameLimit: number;
    spriteLength: number;
    stateMap: {
        [key: string]: number[];
    };
    hitBox: object;
    constructor(x: number, y: number, w: number, h: number, rotation: number, spriteSheet: string, shape: string, radius?: number);
    getSpriteInfo(): object;
    updateHitBox(): void;
    animate(deltaTime: any): void;
}
export default Entity;
