

class Entity {
    x: number;
    y: number;
    w: number;
    h: number;
    xVelocity: number;
    yVelocity: number;
    xFriction: number;
    yFriction: number;
    gravity: number;

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

    hitBox: object;

    constructor(x: number, y: number, w: number, h: number, rotation: number, spriteSheet: string, shape: string, radius?: number){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.shape = shape;

        this.hitBox = {
            type: shape,
            x,
            y,
            radius,
            w,
            h
        }

        this.spriteWidth = w;
        this.spriteHeight = h;

        this.rotation = rotation;
        this.spriteSheet = spriteSheet;
        
        this.frameCount = 0;
        this.spriteLength = 0
        this.currentFrame = 0;
        this.frameLimit = 1000;

        this.state = '';

        this.xVelocity = 0;
        this.yVelocity = 0;
        this.xFriction = 0;
        this.yFriction = 0;
        this.gravity = 0;
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
            state: this.state
        }
    }

    updateHitBox() {
        this.hitBox = {
           ...this.hitBox,
            x: this.x,
            y: this.y,
        }
    }

    update(deltaTime){
        
    }



    animate(deltaTime){
        this.frameCount += deltaTime;
        if(this.frameCount > this.frameLimit){
            this.currentFrame += 1;
            if(this.currentFrame > this.spriteLength){
                this.currentFrame = 0;
            }
            this.frameCount = 0;
        }
    }

    handleCollision(type){

    }
    
}

export default Entity;