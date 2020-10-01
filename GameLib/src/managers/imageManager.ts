import SpriteSheet from '../classes/spriteSheet';
class ImageManager {
    images: object;
    scale: number;
    debugger: boolean;
    imageRoot: string;

    ctx: CanvasRenderingContext2D;
    buffer: HTMLCanvasElement
    bufferContext: CanvasRenderingContext2D;


    constructor(){
        this.debugger = false;
        this.images = {};

        this.ctx = null;
        this.scale = 1;
        this.buffer = document.createElement('canvas');
        this.buffer.width = 100;
        this.buffer.height = 100;
        this.bufferContext = this.buffer.getContext('2d');
        this.imageRoot = './images';
    }
    setup(ctx, scale: number) {
        this.ctx = ctx;
        this.scale = scale;
        this.bufferContext.imageSmoothingEnabled = false;
    }

    addImages(name:  string, imageSrc, imageSpec: object){
        //this.images[name] = new SpriteSheet(imageSrc, imageSpec);
    }

    // sets the root for spritesheets default is /images
    setImageRoot(path: string){
        this.imageRoot = path;
    }

    addSprites(imageSpec: any[]){
        imageSpec.forEach(spec => {
            if(spec.tiledversion){
                // this is a tile sheet from tiled
                this.images[spec.name] = new SpriteSheet(spec, 'tiled', this.imageRoot);
            }else {
                this.images[spec.name] = new SpriteSheet(spec, 'custom', this.imageRoot);
            }
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
        if(object.type < 0) return
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
        
        const {tile, img} = (spriteSheet.resolveSpriteData(object.getMappedState(), time));

        if (object.rotation ! === 0 || object.rotation == null){
            this.ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), object.w, object.h);
       }else {
            // move to center of ima
            this.bufferContext.translate(Math.floor(object.w/2), Math.floor(object.h/2));
            // rotate by specific degree
            this.bufferContext.rotate((2 * Math.PI - object.rotation * Math.PI / 180 ));
    
            this.bufferContext.drawImage(img, tile.x, tile.y, tile.w, tile.h, -Math.floor(object.w/2), -Math.floor(object.h/2), object.w, object.h);
            // rotate back
            this.bufferContext.rotate(-(2 * Math.PI - object.rotation * Math.PI / 180 ));
            // move back to regular offset
            this.bufferContext.translate(-Math.floor(object.w/2), -Math.floor(object.h/2));

            this.ctx.drawImage(this.bufferContext.canvas, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y))

            this.bufferContext.clearRect(0,0, tile.w*2, tile.h*2)
       }
    };

    drawBG(bg: string, x: number, y: number){
        let image = this.images[bg];
        this.ctx.drawImage(image, x, y, image.width, image.height, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };


    //@todo: work on this to change fonts and colors and styles
    drawText(text: string, x: number, y: number, options?){
        this.ctx.textAlign= 'left';
        this.ctx.fillText(text, x, y);
    }

    debug(option: boolean){
        this.debugger = option;
    }

    //@Todo revamp particle system
    drawParticle(object, camera, time){
        // // todo: fix to work with levels
        // let particle = object.getSpriteInfo();
        // if(!particle.spriteSheet ){
        //     this.ctx.fillStyle = particle.color;
        //     this.ctx.fillRect(particle.x, particle.y, particle.w, particle.h);
        // }else {
        //     let offset = {x:0 , y: 0}
        //     if(camera){
        //         if(!camera.checkifViewable(object)){
        //             return
        //         }
        //         offset.x = camera.xOffset;
        //         offset.y = camera.yOffset;
        //     }
    
        //     const spriteSheet = this.resolveSpriteSheet(object.spriteSheet);
        //     const {tile, img} = (spriteSheet.resolveSpriteData(object.state, time));
    
        // if(particle.opacity != 1){
        //     this.ctx.globalAlpha = particle.opacity;
        // }


        //     this.ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), object.w, object.h);

        // if(this.ctx.globalAlpha != 1){
        //     this.ctx.globalAlpha =1;
        // }
        // }
    }
}

export default ImageManager