
class ImageManager {
    ready: boolean;
    images: object;
    imageCollection: object;
    imageSrc: object;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scale: number;

    constructor(){
        this.ready = false;
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
        this.imageSrc = images
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
    drawSprite(image: string, x: number, y: number, rotation: number){
        this.ctx.save();


        this.ctx.restore();
    }
    drawBG(image: string, rotation){

    }
}

export default ImageManager