

class Particle {
    life: number;
    current: number;
    lifeState: number
    color: string;
    opacity: number;
    currentState: string;
    rotation: number;
    spriteSheet: string;
    spriteWidth: number;
    spriteHeight: number;
    x: number;
    y: number;
    w: number;
    h: number;
    currentFrame: number;
    frameLimit: number;

    constructor(x: number, y: number, w: number, h: number, life: number, rotation: number, color, opactity: number, spriteSheet? : string, state?: string){
        this.life = life;
        this.current = 0;
        this.lifeState = 1;
        this.color = color;
        this.opacity = opactity;
        this.currentState = state;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.spriteWidth = w;
        this.spriteHeight = h;
        this.rotation = rotation;
        this.spriteSheet = spriteSheet;
        this.currentFrame = 0;
        this.frameLimit = 1000;
    }  

    update(x, y){
        this.current += 1;
        this.x = x;
        this.y = y;

        if(this.current > this.life && this.life > 0){
            this.lifeState = 0
        }
    }

    reset(x, y){
        this.current = 0
        this.lifeState = 1;
        this.x = x;
        this.y = y;
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