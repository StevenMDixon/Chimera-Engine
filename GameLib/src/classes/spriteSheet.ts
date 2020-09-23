
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

        let t = new Promise((resolve, reject) => {
            this.image.addEventListener('load', () => {
                resolve({ikey: this.image});
            })
        })

        this.image.src = this.data.src;

        if(this.data.spec){
            if(this.data.spec.offset){
                this.offset = this.data.spec.offset;
            }
        }
        if(this.data.tiles){
            this.data.tiles.forEach(tile => {
                this.tiles.set(tile.name, 
                    {x: tile.index[0] * (tile.size[0] + this.offset ),
                    y:tile.index[1] * (tile.size[1] + this.offset ),
                    w: tile.size[0],
                    h: tile.size[1]
                })
            })
        }

        

        return t; 
    }
    resolveImage(){
        return this.image
    }
    resolveImageData(Name){
        return this.data[Name];
    }
    resolveTileData(index){

    }
}

export default SpriteSheet;
