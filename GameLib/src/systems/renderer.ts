import System from './system_base';
import SpriteSheet from '../classes/spriteSheet';

class Renderer extends System{
    spriteSheets: object;

    constructor(store){
        super(store);
        this.spriteSheets = {};
    }

    setup(){
        //this.bufferContext.imageSmoothingEnabled = false;
    }

    getTools(){
        return {
            drawTile: this.drawTile.bind(this),
            drawSprite: this.drawSprite.bind(this),
            drawBackGround: this.drawBG.bind(this),
            drawText: this.drawText.bind(this),
            drawParticle: this.drawParticle.bind(this)
        }
    }

    resolveSpriteSheet(name){
        return this.spriteSheets[name];
    }

    resolveImage(name){
        return this.store.access('images')[name];
    }

    addSprites(imageSpec: any[]){
        imageSpec.forEach(spec => {
            if(spec.tiledversion){
                // this is a tile sheet from tiled
                // this.images[spec.name] = new SpriteSheet(spec, 'tiled', this.imageRoot);
            }else {
                //this.images[spec.name] = new SpriteSheet(spec, 'custom', this.imageRoot);
            }
        })
    }

    drawTile(object){
        const offset = {  x:0 , y: 0 }
        if(object.type < 0) return
        
        const {camera, totalTime, ctx} = this.store.access();

        if(camera){
            if(!camera.checkifViewable(object)){
                return
            }
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = this.resolveSpriteSheet(object.spriteSheet);
        
        const {tile, imageName} = (spriteSheet.resolveTileData(object.type, totalTime));

        const img = this.resolveImage(imageName);

        ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - Math.ceil(offset.x)), Math.floor(object.y - Math.ceil(offset.y)), object.w, object.h);
    }

    drawSprite(object){
        const offset = {x:0 , y: 0}
        const {camera, totalTime, ctx} = this.store.access();

        if(camera){
            if(!camera.checkifViewable(object)){
                return
            }
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = this.resolveSpriteSheet(object.spriteSheet);
        
        const {tile, img} = (spriteSheet.resolveSpriteData(object.getMappedState(), totalTime));

        if (object.rotation ! === 0 || object.rotation == null){
            ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), object.w, object.h);
       }else {
            // // move to center of ima
            // this.bufferContext.translate(Math.floor(object.w/2), Math.floor(object.h/2));
            // // rotate by specific degree
            // this.bufferContext.rotate((2 * Math.PI - object.rotation * Math.PI / 180 ));
    
            // this.bufferContext.drawImage(img, tile.x, tile.y, tile.w, tile.h, -Math.floor(object.w/2), -Math.floor(object.h/2), object.w, object.h);
            // // rotate back
            // this.bufferContext.rotate(-(2 * Math.PI - object.rotation * Math.PI / 180 ));
            // // move back to regular offset
            // this.bufferContext.translate(-Math.floor(object.w/2), -Math.floor(object.h/2));

            // this.ctx.drawImage(this.bufferContext.canvas, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y))

            // this.bufferContext.clearRect(0,0, tile.w*2, tile.h*2)
       }
    };
    drawParticle(object){
           
    }

    drawBG(bg: string, x: number, y: number){
        // let image = this.images[bg];
        // this.ctx.drawImage(image, x, y, image.width, image.height, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };


    //@todo: work on this to change fonts and colors and styles
    drawText(text: string, x: number, y: number, options?){
        console.log('it is called')
        const {ctx} = this.store.access('ctx');
        ctx.fillStyle = 'white'
        ctx.textAlign= 'left';
        ctx.fillText(text, x, y);
    }
}

export default Renderer;