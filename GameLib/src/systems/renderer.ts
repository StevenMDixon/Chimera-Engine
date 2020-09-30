import System from './system_base';
import SpriteSheet from '../classes/spriteSheet';

class Renderer extends System{
    ctx: CanvasRenderingContext2D;

    constructor(store){
        super(store)
        this.ctx = null;
    }

    setup(){

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
}

export default Renderer;