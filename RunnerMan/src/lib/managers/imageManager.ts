interface imageData {
    tiles?: {
        width: number,
        height: number,
        sheet: string,
        mapAlias: {
            [key: number]: number[]
        }
    },
    sprites?: {
        width: number,
        height: number,
        sheet: string,
        animationKeys: {
            row: number,
            column: number,
            alength: number
        }
    }
}


class ImageManager {
    images: object;
    imageSrc: object;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scale: number;

    constructor(){
        this.images = {};
        this.imageSrc = {};
        this.ctx = null;
        this.canvas = null;
        this.scale = 1;
    }
    setup(ctx, canvas, scale: number) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
    }
    addImages(images: object){
        this.imageSrc = images;
    }
    async loadImages() :Promise<boolean>{
        let p = [];
        for(const ikey in this.imageSrc){
            this.images[ikey] = new Image();

            let promise = new Promise((resolve, reject) => {
                this.images[ikey].addEventListener('load', () => {
                    resolve({ikey: this.images[ikey]});
                })
            })
            p.push(promise);
            this.images[ikey].src = this.imageSrc[ikey];
        }
        return Promise.all(p).then(v => {return true})
    }

    getRenderer(): object{
        return {
            drawTile: this.drawTile.bind(this),
            drawSprite: this.drawSprite.bind(this),
            drawBackGround: this.drawBG.bind(this),
            drawText: this.drawText.bind(this)
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
        }
    }

    drawSprite(object, x: number, y: number){
        let sprite = object.getSpriteInfo();
        let target = {x: 0, y: 0};
        let width = sprite.w;
        let height = sprite.h;
        let image = this.images[sprite.spriteSheet];
        target.x = sprite.state[0] * sprite.w + object.currentFrame *  sprite.w;
        target.y = sprite.state[1] * sprite.h;

        //check if rotation is null
        if (sprite.r ! === 0 || sprite.r == null){
            this.ctx.drawImage(image, target.x, target.y, width, height, x/this.scale, y/this.scale, width/this.scale, height/this.scale);
        }else {
            // move to center of image
            this.ctx.translate(x + width/2, y + height/2);
            // rotate by specific degree
            this.ctx.rotate(sprite.r * Math.PI / 180);
            // this.ctx.strokeStyle = "red";
            // this.ctx.beginPath();
            // this.ctx.rect(0, 0, 100, 100);
            // this.ctx.stroke();
            this.ctx.drawImage(image, target.x, target.y, width, height, 0 - width/2, 0 - height/2, width/this.scale, height/this.scale);
            // rotate back
            this.ctx.rotate(-sprite.r * Math.PI / 180);
            // move back to regular offst
            this.ctx.translate(-x - width/2 , -y -  height/2);
        }
    };

    drawBG(bg: string, x: number, y: number, rotation: number){
        let image = this.images[bg];
        this.ctx.drawImage(image, x, y, image.width, image.height, 0, 0, this.canvas.width/this.scale, this.canvas.height/this.scale);
    };
    // todo: work on this to change fonts and colors and styles
    drawText(text: string, x: number, y: number){
        this.ctx.fillText(text, x, y);
    }
}

export default ImageManager