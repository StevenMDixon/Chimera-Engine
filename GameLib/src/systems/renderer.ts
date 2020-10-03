import System from './system_base';
import SpriteSheet from '../modules/spriteSheet';

class Renderer extends System{
    private spriteSheets: any;

    constructor(store){
        super(store);
        this.spriteSheets = SpriteSheet;
    }

    public setup(){
        
        //this.bufferContext.imageSmoothingEnabled = false;
        const {sheets, imageRoot} = this.store.getStore('asset').access('sheets', 'imageRoot');

        this.spriteSheets.create(sheets, imageRoot);
    }

    public getTools(){
        return {
            drawTile: this.drawTile.bind(this),
            drawSprite: this.drawSprite.bind(this),
            drawBackGround: this.drawBG.bind(this),
            drawText: this.drawText.bind(this),
            drawParticle: this.drawParticle.bind(this),
            drawRect: this.drawRect.bind(this),
            drawCircle: this.drawCircle.bind(this),
            drawLine: this.drawLine.bind(this),
            drawTriangle: this.drawTriangle.bind(this)
        }
    }

    private resolveImage(name){
        const {images} = this.store.getStore('asset').access('images')
        return images[name];
    }

    public drawTile(object){
        const offset = {  x:0 , y: 0 }
        if(object.type < 0) return
        
        const {camera, totalTime, ctx} = this.store.getStore('engine').access();

        if(camera){
            if(!camera.checkifViewable(object)){
                return
            }
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = this.spriteSheets.resolve(object.spriteSheet);

        const {tile, imageName} = (spriteSheet.resolveTileData(object.type, totalTime));
        const img = this.resolveImage(imageName);

        ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - Math.ceil(offset.x)), Math.floor(object.y - Math.ceil(offset.y)), object.w, object.h);
    }

    public drawSprite(object){
        const offset = {x:0 , y: 0}
        const {camera, totalTime, ctx} = this.store.getStore('engine').access();

        if(camera){
            if(!camera.checkifViewable(object)){
                return
            }
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = null; //this.resolveSpriteSheet(object.spriteSheet);
        
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

    public drawParticle(object){
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

    public drawBG(bg: string, x: number, y: number){
        // let image = this.images[bg];
        // this.ctx.drawImage(image, x, y, image.width, image.height, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    };


    //@todo: work on this to change fonts and colors and styles
    public drawText(text: string, x: number, y: number, options?){
        const {ctx} = this.store.getStore('engine').access('ctx');
        ctx.fillStyle = 'white'
        ctx.textAlign= 'center';
        ctx.textBaseLine = 'center';
        ctx.fillText(text, x, y);
    }

    //@todo add primitive drawing
    /*
        drawRect
        drawCir
        drawLine
        drawTriangle
    */

    public drawRect(x, y, w, h, color){
        const {ctx} = this.store.getStore('engine').access('ctx');
        let fs = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h)
        ctx.fillStyle = fs;
    }

    public drawCircle(x, y, r, color){
        const {ctx} = this.store.getStore('engine').access('ctx');
        let fs = ctx.fillStyle;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
        ctx.fillStyle = fs;
    }
    
    public drawLine(p1x, p1y, p2x, p2y, color){
        const {ctx} = this.store.getStore('engine').access('ctx');
        let fs = ctx.strokeStyle
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.closePath();
        ctx.stroke();
        //ctx.fill();
        ctx.strokeStyle = fs;
    }

    public drawTriangle(p1x, p1y, p2x, p2y, p3x, p3y, color){
        const {ctx} = this.store.getStore('engine').access('ctx');
        let fs = ctx.fillStyle
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(p1x, p1y);
        ctx.lineTo(p2x, p2y);
        ctx.lineTo(p3x, p3y);
        ctx.closePath();
        //ctx.stroke();
        ctx.fill();
        ctx.fillStyle = fs;
    
    }


}

export default Renderer;