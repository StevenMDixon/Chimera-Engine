// cores job is to setup the environment and implement the built in systems

import {config} from './config';
import {manageDPI} from '../modules/resizer';

import Store from '../modules/store';
import SceneHandler from '../systems/scene_handler';
import Loader from '../modules/loader';
import Camera from '../classes/camera';


interface gameData {
    target: string,
    scale?: number,
    size: {
        w: number, h: number
    } | string,
    useController?: boolean,
    debug?: boolean,
    imageRoot?: string,
    scenes: {
        [key: string]: any
    },
    controllerMap?: {
        [key: string]: any
    },
    sounds?: {
        [key: string]: any
    }
}


function core(){
    // general shared store for engine
    const engineStore = Store(config);
    // general shared stor for assets
    const assetStore = Store({imageRoot: ''});
    // create renderer pass in global store
    const sceneHandler = new SceneHandler(engineStore);

    const loader = Loader(assetStore);

    return {

        setup(gamedata: gameData){
            const {target, scale, size, useController, debug, imageRoot, scenes, controllerMap, sounds} = gamedata;
            
            const canvas = document.getElementById(target) as any;

            engineStore.set({
                ctx: canvas.getContext('2d'),
                scale,
                useController,
                debug,
                controllerMap,
                sounds,
                imageRoot: imageRoot || config.imageRoot
            });

            assetStore.set({imageRoot: imageRoot || config.imageRoot})
 
            const {ctx} = engineStore.access('ctx');
    
            if(typeof size == 'object')   {
                ctx.canvas.width  = size.w;
                ctx.canvas.height = size.h;
            } else if(size == 'full'){
                ctx.canvas.width  = window.innerWidth;
                ctx.canvas.height = window.innerHeight;
            }

            // set intial screen scale, this can be changed later
            ctx.imageSmoothingEnabled = false;
            ctx.scale(scale, scale);

            // create camera, we only need one?
            engineStore.set({'camera': new Camera(0, 0, ctx.canvas.width/scale, ctx.canvas.height/scale)})

            // fix issues with resizing screens
            manageDPI(ctx);
        },
        
        async start() : Promise<object>{
            const {imageP} = assetStore.access('imageP');
            console.log('Engine Start')
            Promise.all(imageP)
            .catch((error) => console.log(error))
            .then(()=>{
                this.update();
            })
            // let ready = await this.renderer.loadImages();
            // if(ready){
            //     this.update();
            // }else {
            //     throw ne Error('Image loader failed to load images');
            // }
            return
        },

        update(time: number = 0): void{
            console.log('Engine Running')
            const {camera, totalTime} = engineStore.access();

            const now = performance.now();
            const deltaTime =  now - time;

            engineStore.update('totalTime',  totalTime + deltaTime);
    
            sceneHandler.update();
            camera.updateCamera();
    
            requestAnimationFrame(() => this.update(now));
        },

        

         setOption(key, value){
            engineStore.update(key, value);
         },

         loadAssets(assets){
            Object.keys(assets).forEach(key => loader.load(key, assets[key]));

            console.log(assetStore.access())
         }
    }

}


// making core a singleton no need for the user to redefine stuff
export default core()