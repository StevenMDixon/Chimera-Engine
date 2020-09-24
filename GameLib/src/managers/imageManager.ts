import SpriteSheet from '../classes/spriteSheet';

class ImageManager {
    images: object;
   // imageSrc: object;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scale: number;
    debugger: boolean;

    constructor(){
        this.debugger = false;
        this.images = {};
        //this.imageSrc = {};
        this.ctx = null;
        this.canvas = null;
        this.scale = 1;
    }
    setup(ctx, canvas, scale: number) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
    }
    addImages(name:  string, imageSrc, imageSpec: object){
        //this.images[name] = new SpriteSheet(imageSrc, imageSpec);
    }
    addSprites(imageSpec: any){
        this.images[imageSpec.name] = new SpriteSheet(imageSpec);
    }
    async loadImages() :Promise<boolean>{
        let p = [];
        for(const ikey in this.images){
           p.push(this.images[ikey].loadImage())
        }
        return Promise.all(p).then(v => {return true})
    }

    getRenderer(): object{
        return {
            drawTile: this.drawTile.bind(this),
            drawSprite: this.drawSprite.bind(this),
            drawBackGround: this.drawBG.bind(this),
            drawText: this.drawText.bind(this),
            drawParticle: this.drawParticle.bind(this),
            drawTileMap: this.drawTileMap.bind(this)
        }
    }

    getLevelRenderer() {
        return {
            drawTile: this.drawLevelTile.bind(this)
        }
    }

    resolveSpriteSheet(){

    }

    drawLevelTile(object){

    }

    drawTile(object) {
        let tile = object.getSpriteInfo();
        if(object.spriteSheet && tile.type > 0){
            let target = {x: 0, y: 0}
            let width = tile.w;
            let height = tile.h;
            let image = this.images[tile.spriteSheet];
            target.x = (tile.type - 1 ) * width;
            target.y = 0;

            this.ctx.drawImage(image, target.x, target.y, width, height, tile.x/this.scale, tile.y/this.scale, width/this.scale, height/this.scale);


            if(this.debugger){
                const hitbox = object.hitBox;
                const pStrokeStyle = this.ctx.strokeStyle;
                this.ctx.strokeStyle = "red";
                this.ctx.beginPath();
                if(hitbox.type == 'square'){

                    this.ctx.rect(hitbox.x, hitbox.y, hitbox.w, hitbox.h)

                } else if (hitbox.type == 'circle'){
                    this.ctx.arc(hitbox.x, hitbox.y, hitbox.radius, 0, 2 * Math.PI);
                }
                this.ctx.stroke();
                this.ctx.strokeStyle = pStrokeStyle;
            }
        }
    }

    drawSprite(object, x?: number, y?: number){

        let sprite = object.getSpriteInfo();
        let sheet = this.images[sprite.spriteSheet];
        let image = this.images[sprite.spriteSheet].image;

        let sx = x? x: object.x;
        let sy = y? y: object.y;
        let width = sprite.w;
        let height = sprite.h;

        let target = sheet.tiles.get(sprite.state);

        //check if rotation is null
        if (sprite.r ! === 0 || sprite.r == null){

            this.ctx.drawImage(image, target.x, target.y, target.w, target.h, sx, sy, width, height);
        }else {
            // move to center of image
            this.ctx.translate(x + width/2, y + height/2);
            // rotate by specific degree
            this.ctx.rotate(sprite.r * Math.PI / 180);
            // this.ctx.strokeStyle = "red";
            // this.ctx.beginPath();
            // this.ctx.rect(0, 0, 100, 100);
            // this.ctx.stroke();
            this.ctx.drawImage(image, target.x, target.y, width, height, 0 - width/2, 0 - height/2, width, height);
            // rotate back
            this.ctx.rotate(-sprite.r * Math.PI / 180);
            // move back to regular offst
            this.ctx.translate(-x - width/2 , -y -  height/2);
        }
        if(this.debugger){
            const hitbox = object.hitBox;
            const pStrokeStyle = this.ctx.strokeStyle;
            this.ctx.strokeStyle = "red";
            this.ctx.beginPath();
            if(hitbox.type == 'square'){

                this.ctx.rect(hitbox.x, hitbox.y, hitbox.w, hitbox.h)

            } else if (hitbox.type == 'circle'){
                this.ctx.arc(hitbox.x, hitbox.y, hitbox.radius, 0, 2 * Math.PI);
            }
            this.ctx.stroke();
            this.ctx.strokeStyle = pStrokeStyle;
        }
    };

    drawBG(bg: string, x: number, y: number){
        let image = this.images[bg];
        this.ctx.drawImage(image, x, y, image.width, image.height, 0, 0, this.canvas.width, this.canvas.height);
    };
    // todo: work on this to change fonts and colors and styles
    drawText(text: string, x: number, y: number, options?){

        this.ctx.textAlign= 'left';

        this.ctx.fillText(text, x, y);
    }

    debug(option: boolean){
        this.debugger = option;
    }

    drawParticle(object){
        let particle = object.getSpriteInfo();
        if(!particle.spriteSheet ){
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(particle.x, particle.y, particle.w, particle.h);
        }else {
        let target = {x: 0, y: 0};
        let width = particle.w;
        let height = particle.h;
        let image = this.images[particle.spriteSheet];
        target.x = particle.state[0] * particle.w + object.currentFrame *  particle.w;
        target.y = particle.state[1] * particle.h;
        if(particle.opacity != 1){
            this.ctx.globalAlpha = particle.opacity;
        }


        this.ctx.drawImage(image, target.x, target.y, width, height, particle.x/this.scale, particle.y/this.scale, width/this.scale, height/this.scale);

        if(this.ctx.globalAlpha != 1){
            this.ctx.globalAlpha =1;
        }
        }
    }

    drawTileMap(map, spriteSheet){
        map.forEach((tile, i) => {

        })
    }
}

export default ImageManager