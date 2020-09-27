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

    addSprites(imageSpec: any[]){
        imageSpec.forEach(spec => {
            this.images[spec.name] = new SpriteSheet(spec);
        })
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
            drawParticle: this.drawParticle.bind(this)
        }
    }

    getLevelRenderer() {
        return {
            drawTile: this.drawTile.bind(this),
            drawSprite: this.drawSprite.bind(this)
        }
    }


    resolveSpriteSheet(name){
        return this.images[name]
    }

    drawTile(object, time, camera?){
        let offset = {  x:0 , y: 0 }
        if(camera){
            if(!camera.checkifViewable(object)){
                return
            }
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = this.resolveSpriteSheet(object.spriteSheet);
        const {tile, img} = (spriteSheet.resolveTileData(object.type, time));

        this.ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - Math.ceil(offset.x)), Math.floor(object.y - Math.ceil(offset.y)), object.w, object.h);

    }

    

    drawSprite(object, time, camera?){

        let offset = {x:0 , y: 0}
        if(camera){
            if(!camera.checkifViewable(object)){
                return
            }
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = this.resolveSpriteSheet(object.spriteSheet);
        const {tile, img} = (spriteSheet.resolveSpriteData(object.state, time));

        if (object.r ! === 0 || object.r == null){
            this.ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), object.w, object.h);
        }else {
            // move to center of image
            this.ctx.translate(object.x + object.w/2, object.y + object.h/2);
            // rotate by specific degree
            this.ctx.rotate(object.r * Math.PI / 180);
            // this.ctx.strokeStyle = "red";
            // this.ctx.beginPath();
            // this.ctx.rect(0, 0, 100, 100);
            // this.ctx.stroke();
            this.ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), object.w, object.h);
            // rotate back
            this.ctx.rotate(-object.r * Math.PI / 180);
            // move back to regular offset
            this.ctx.translate(-object.x - object.w/2 , -object.y -  object.h/2);
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
        // todo: fix to work with levels
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


        this.ctx.drawImage(image, target.x, target.y, width, height, particle.x, particle.y, width, height);

        if(this.ctx.globalAlpha != 1){
            this.ctx.globalAlpha =1;
        }
        }
    }
}

export default ImageManager