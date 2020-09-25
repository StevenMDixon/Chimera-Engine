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
            drawTile: this.drawLevelTile.bind(this),
            drawSprite: this.drawLevelSprite.bind(this)
        }
    }

    resolveSpriteSheet(name){
        return this.images[name]
    }

    drawLevelTile(object, dt, camera){
        let offset = {  x:0 , y: 0 }
        if(camera){
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        const spriteSheet = this.resolveSpriteSheet(object.spriteSheet);
        const {tile, img} = (spriteSheet.resolveTileData(object.type));
   
       if(camera.checkifViewable(object)){
            this.ctx.drawImage(img, tile.x, tile.y, tile.w, tile.h, Math.floor(object.x - Math.ceil(offset.x)), Math.floor(object.y - Math.ceil(offset.y)), object.w, object.h);
       }
    }

    drawLevelSprite(object, dt, camera){
        if(camera.checkifViewable(object)){
            this.drawSprite(object, camera);
        }
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

    drawSprite(object, camera?){

        let offset = {x:0 , y: 0}
        if(camera){
            offset.x = camera.xOffset;
            offset.y = camera.yOffset;
        }

        let sprite = object.getSpriteInfo();
        let sheet = this.images[sprite.spriteSheet];
        let image = this.images[sprite.spriteSheet].image;

        let width = sprite.w;
        let height = sprite.h;

        let target = sheet.tiles.get(sprite.state);

        //check if rotation is null
        if (sprite.r ! === 0 || sprite.r == null){
            this.ctx.drawImage(image, target.x, target.y, target.w, target.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), width, height);
    
        }else {
            // move to center of image
            this.ctx.translate(object.x + width/2, object.y + height/2);
            // rotate by specific degree
            this.ctx.rotate(sprite.r * Math.PI / 180);
            // this.ctx.strokeStyle = "red";
            // this.ctx.beginPath();
            // this.ctx.rect(0, 0, 100, 100);
            // this.ctx.stroke();
            this.ctx.drawImage(image, target.x, target.y, target.w, target.h, Math.floor(object.x - offset.x), Math.floor(object.y - offset.y), width, height);
            // rotate back
            this.ctx.rotate(-sprite.r * Math.PI / 180);
            // move back to regular offst
            this.ctx.translate(-object.x - width/2 , -object.y -  height/2);
        }
        if(this.debugger){
            const hitbox = object.hitBox;
            const pStrokeStyle = this.ctx.strokeStyle;
            this.ctx.strokeStyle = "red";
            this.ctx.beginPath();
            if(hitbox.type == 'square'){

                this.ctx.rect(Math.floor(hitbox.x  - offset.x), Math.floor(hitbox.y -  offset.y), hitbox.w, hitbox.h)

            } else if (hitbox.type == 'circle'){
                this.ctx.arc(hitbox.x - offset.x, hitbox.y - offset.y, hitbox.radius, 0, 2 * Math.PI);
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


        this.ctx.drawImage(image, target.x, target.y, width, height, particle.x, particle.y, width, height);

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