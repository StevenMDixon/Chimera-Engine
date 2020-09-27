function createAnimation(frames, length){
    return function resolveFrame(d){
        const index = Math.floor(d/ length) % frames.length;
        return frames[index];
    }
}


class SpriteSheet {
    src:  any;
    data: any;
    image: any;
    name: string
    tiles: any;
    animations: any;
    offset: number;
    map: any;

    constructor(data){
        this.image = null;
        this.data = data;
        this.tiles = new Map();
        this.animations = new Map();
        this.map = new Map();
        this.offset = 0;
    }
    async loadImage() :Promise<unknown>{
        this.image = new Image();
        //load image from json file
        let t = new Promise((resolve, reject) => {
            this.image.addEventListener('load', () => {
                resolve({ikey: this.image});
            })
        })
        // set the source
        this.image.src = this.data.src;
        // check for spec key
        if(this.data.spec){
            if(this.data.spec.offset){
                this.offset = this.data.spec.offset;
            }
        }
        // check for frames
        if(this.data.frames){
            this.data.frames.forEach(tile => {
                this.tiles.set(tile.name, 
                    {x: tile.rect[0] + (tile.rect[0]/ tile.rect[2] * this.offset) ,
                    y:tile.rect[1] + (tile.rect[1]/ tile.rect[3] * this.offset),
                    w: tile.rect[2],
                    h: tile.rect[3]
                })
            })
        }

        //check for animations
        if(this.data.animations){
            this.data.animations.forEach(animation => {
                this.animations.set(animation.name, createAnimation(animation.frames, animation.frameLen));
            })
        }

        return t; 
    }

    resolveSpriteData(name, time){
        if(this.animations.get(name)){
            let anim = this.animations.get(name);
            return {tile: this.tiles.get(anim(time)), img: this.image};
        }else {
            return {tile: this.tiles.get(name), img: this.image};
        }
    }
    resolveTileData(index, time){
        let imageName = this.data.map[index];

        if(this.animations.get(imageName)){
            let anim = this.animations.get(imageName);
            return {tile: this.tiles.get(anim(time)), img: this.image};
        }else {
            return {tile: this.tiles.get(imageName), img: this.image};
        }
    }
}

export default SpriteSheet;
