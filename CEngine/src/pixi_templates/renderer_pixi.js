class Renderer {
    constructor(PixiConfig){
        this.renderer = null;
        this._w = null;
        this._h = null;
        this._init(PixiConfig);
        this.type = 'PIXI'
    }

    _autoResize(){
        window.addEventListener('resize', ()=>{
                this._w = window.innerWidth;
                this._h = window.innerHeight;
                this.renderer.resize(this._w, this._h);
        });
    }

    _init({options, PIXI}){
        const {size, target, autoResize, DPI, resolution} = options;

        // set the width and height of the renderer
        this._w = size.w || size.h || window.innerWidth;
        this._h = size.h || size.w || window.innerHeight;
    
        if(! target) console.log('Missing target');

        this.renderer = new PIXI.Renderer(
            {
                view: document.getElementById(target),
                width: this._w,
                height: this._h,
                resolution: resolution || window.devicePixelRatio,
                autoDensity: DPI || false
            }
        );

        // add event listener
        if(autoResize){
            this._autoResize();
        }

       
    }

    render(scene){
        if(scene.stage){
            this.renderer.render(scene.stage);
        }
        
    }
}

export default Renderer;