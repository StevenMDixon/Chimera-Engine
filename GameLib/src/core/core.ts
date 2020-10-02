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
    const sceneHandler = new SceneHandler(engineStore, assetStore);
    // loads images and other assets specified by the user
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
                imageRoot: imageRoot || config.imageRoot,
                scenes
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
            //ctx.imageSmoothingEnabled = false;
            ctx.scale(2, 2);

            // create camera, we only need one?
            engineStore.set({'camera': new Camera(0, 0, ctx.canvas.width/scale, ctx.canvas.height/scale)})

            // fix issues with resizing screens
            window.addEventListener('resize', (e) => manageDPI(ctx));
            manageDPI(ctx);

            sceneHandler.setup(engineStore, assetStore);
        },
        
        async start(){
            const {imageP} = assetStore.access('imageP');
            Promise.all(imageP)
            .catch((error) => console.log(error))
            .then(()=>{
                this.update();
            })
        },

        update(time: number = 0): void{
            const {totalTime} = engineStore.access();

            const now = performance.now();
            const deltaTime =  now - time;

            engineStore.update('totalTime',  totalTime + deltaTime);
    
            sceneHandler.update();
    
            requestAnimationFrame(() => this.update(now));
        },

        

         setOption(key, value){
            engineStore.update(key, value);
         },

         loadAssets(assets){
            Object.keys(assets).forEach(key => loader.load(key, assets[key]));

         }
    }

}


// making core a singleton no need for the user to redefine stuff
export default core()