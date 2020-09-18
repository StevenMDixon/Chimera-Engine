import Entity from './entity';

class Particle extends Entity {
    life: number;
    current: number;
    lifeState: number
    color: string;
    opacity: number;
    currentState: number[];

    constructor(x: number, y: number, w: number, h: number, life: number, rotation: number, color, opactity: number, spriteSheet? : string, frame?: number, state?: number[]){
        super(x, y, w, h, rotation, spriteSheet, 'circle');
        this.life = life;
        this.current = 0;
        this.lifeState = 1;
        this.color = color;
        this.opacity = opactity;
        this.currentFrame = frame;
        this.currentState = state;
    }  
    update(x, y){
        this.current += 1;
        this.x = x;
        this.y = y;

        if(this.current > this.life && this.life > 0){
            this.lifeState = 0
        }
    }

    reset(x, y, frame?){
        this.current = 0
        this.lifeState = 1;
        this.x = x;
        this.y = y;
        this.currentFrame = frame;
    }

    getSpriteInfo() : object{
        return {
            spriteSheet: this.spriteSheet,
            x: this.x,
            y: this.y,
            w: this.spriteWidth,
            h: this.spriteHeight,
            r: this.rotation,
            frame: this.currentFrame,
            state: this.currentState,
            color: this.color,
            opacity: this.opacity
        }
    }
}

export default Particle;    