function createAnimation(frames, length){
    return function resolveFrame(d){
        const index = Math.floor(d/ length) % frames.length;
        return frames[index];
    }
}

function createTiledAnimation(frames, options){
    
    let direction = 'loop';
   
    if(options){
        options.forEach(op => op.name == 'direction'? direction = op.value: '');
    }
    
    let ended = false
    
    const totalFrameTime = frames.reduce((acc, cur)=>{return acc + cur.duration}, 0);
    
    return function resolveFrame(d, e){
        let clampedT = (d % totalFrameTime);
        let i = 0;

        if(direction == 'loop'){
            frames.forEach(frame => {
                clampedT -= frame.duration;
                if(clampedT >= 0){ i += 1}
            })

            return frames[i].tileid;
        }

        if(direction == 'forward' && !ended){
            frames.forEach(frame => {
                clampedT -= frame.duration;
                if(clampedT >= 0){ i += 1}
                if(i == frames.length -1) {ended = true}
            })
        } else if (direction == 'forward' && ended) {
            i = frames.length - 1
        }

       
        return frames[i].tileid;
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
    type: string;
    root: string;

    constructor(data, type, root){
        this.image = null;
        this.data = data;
        this.tiles = new Map();
        this.animations = new Map();
        this.map = new Map();
        this.offset = 0;
        this.type = type;
        this.root = root;
    }
    async loadImage() :Promise<unknown>{
        this.image = new Image();
        //load image from json file
        let t = new Promise((resolve, reject) => {
            this.image.addEventListener('load', () => {
                resolve({ikey: this.image});
            })
        })
        

        let imageSource = '';
        // if this sprite sheet is from tiled use a different sourceHey 
        if(this.type == 'tiled'){
            imageSource = this.root + this.data.image.slice(this.data.image.lastIndexOf('/') )
        }else {
            imageSource = this.root + this.data.src
        }

        // set the source
        this.image.src = imageSource;
        // check for spec key
        if(this.data.spec && this.type == 'custom'){
            if(this.data.spec.offset){
                this.offset = this.data.spec.offset;
            }
        }
        // check for frames
        if(this.data.frames && this.type == 'custom'){
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
        if(this.data.animations && this.type == 'custom'){
            this.data.animations.forEach(animation => {
                this.animations.set(animation.name, createAnimation(animation.frames, animation.frameLen));
            })
        }

        if(this.type == 'tiled'){
            const {tileheight, tilewidth, margin, spacing, tilecount, columns} = this.data;
            console.log(this.data)
            let iy = 0;
            for(let i = 0; i < tilecount; i++){
                
                this.tiles.set(i, {
                    x: margin + ((i%columns) *tilewidth) + ((i%columns) * spacing),
                    y: margin + (iy*tileheight) + (iy * spacing),
                    w: tilewidth,
                    h: tileheight
                })
                iy = Math.floor(i/(columns-1))
            }

           
            //tiled stores animations under the tiles section
            if(this.data.tiles){
                this.data.tiles.forEach(anim => {
                    this.animations.set(
                        anim.id,
                        createTiledAnimation(anim.animation, anim.properties)
                    )
                })
            }
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
        let imageName = '';
        if(this.type == 'tiled'){
            imageName = index;
        }else {
            imageName = this.data.map[index];
        }

        if(this.animations.get(imageName)){
            
            let anim = this.animations.get(imageName);
            return {tile: this.tiles.get(anim(time)), img: this.image};
        }else {
            
            return {tile: this.tiles.get(imageName), img: this.image};
        }
    }
}

export default SpriteSheet;
