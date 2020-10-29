import {config} from './config';
import {manageDPI} from '../modules/resizer';

import Store from './store';

import System_Handler from './core_system';

import Loader from '../modules/loader';
import Camera from '../classes/camera';

import Components from '../components/components';


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
    },
    components?: any,
    systems?: any,
    cameraOptions?: any
}


function core(){
    const store = Store;
    // general shared store for engine
    const engineStore = store.createStore('engine', config);
    // general shared stor for assets
    const assetStore = store.createStore('asset', {});
    // create renderer pass in global store
    const system = new System_Handler();
    // loads images and other assets specified by the user
    const loader = Loader(assetStore);

    return {

        setup(gamedata: gameData){
            const {target, size, useController, debug, imageRoot, scenes, controllerMap, sounds, components, systems} = gamedata;
            
            const canvas = document.getElementById(target) as any;

            store.getStore('engine').set({
                ...config,
                ...gamedata,
                ...{canvas, ctx: canvas.getContext('2d')}
            });

            assetStore.set({imageRoot: imageRoot || config.imageRoot});

            // add user defined components to component list
            Components.addComponents(components || []);
 
            const {ctx, scale} = engineStore.access('ctx', 'scale');
            
            if(!ctx){
                throw new Error('ctx cannot be bound or canvas is missing');
            }
    
            if(typeof size == 'object')   {
                ctx.canvas.width  = size.w;
                ctx.canvas.height = size.h;
            } else if(size == 'full'){
                ctx.canvas.width  = window.innerWidth;
                ctx.canvas.height = window.innerHeight;
            }

            // set intial screen scale, this can be changed later
            ctx.imageSmoothingEnabled = false;

            // create camera, we only need one?
            engineStore.set({'camera': new Camera(0, 0, ctx.canvas.width, ctx.canvas.height, gamedata.cameraOptions || config.cameraOptions)})

            // fix issues with resizing screens
            window.addEventListener('resize', (e) => manageDPI(ctx, scale));
            manageDPI(ctx, scale);       
        },
        
        start(){
            // grab the loaded image 
            const {imageP} = assetStore.access('imageP');
            Promise.all(imageP)
            .catch((error) => console.log(error))
            .then(()=>{
                system.init();
                this._update();
            })
        },

        _update(ts = 0, time: number = 0): void{
            const {totalTime} = engineStore.access('totalTime');
            // set dt = new time - old time
            const deltaTime =  ts - time;
            // set time = to new time
            time = ts;
            // tell the store there is a new total time
            engineStore.update('totalTime',  totalTime + deltaTime);
            // run the engine
            system.update(deltaTime);
            // request a new animation frame
            requestAnimationFrame((timeStamp) => this._update(timeStamp, time));
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