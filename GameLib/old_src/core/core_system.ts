//import Scene from '../classes/scene';
import Object_Handler from '../components/object_handler';
import store from './store';
import {loadMap} from '../modules/loadMap';
import Renderer from '../modules/renderer';
import Composer from '../modules/composer';

import inputSystem from '../systems/input_system';
import renderSystem from '../systems/render_system';
import colissionSystem from '../systems/collision_system';
import System_Base from '../systems/system_base';
import CameraSystem from '../systems/camera_system';
import ParticleSystem from '../systems/particle_system';
import ViewSystem from '../systems/view_system';


import event from './event_system';

class System_Handler{
    scenes: {
        [key: string]: any
    }

    gameObject: {
        [key: string]: Object_Handler
    }

    renderer: any;
    averageFPS: number;
    frame: number;

    constructor(){
        //this.systems = [];
        this.scenes = {};
        this.gameObject = {};
        this.renderer = null;
        this.averageFPS = 0.00;
        this.frame = 1;
    }

    init(){
        const {systems, scenes, ctx} = store.getStore('engine').access('systems', 'scenes', 'ctx');
        //create systems with user defined systems
        createSystemsList([renderSystem, inputSystem, colissionSystem, ViewSystem, CameraSystem, ParticleSystem] ,systems);
        
        //initialize renderer
        this.renderer = Renderer(ctx);
    
        event.subscribe('input_update', (data) => this.system_inputs(data));

        store.getStore('engine').update('currentScene', Object.keys(scenes)[0]);

        event.publishImmediate('init_sys');

        Object.keys(scenes).forEach(scene => {
            this.scenes[scene] = new scenes[scene](this.createAPI(this.renderer));
            this.gameObject[scene] = new Object_Handler();
            this.scenes[scene].setup();
        })
    }

    system_inputs(inputs){
        // listen for game engine editing calls
        const debug = store.getStore('engine').access('debug').debug;
        if(inputs[9] && inputs[49]){  //tab + numbers will toggle engine stuff
            store.getStore('engine').update('debug', !debug);
        }
    }

    getScene(){
        const {currentScene} = store.getStore('engine').access('currentScene');
        return this.scenes[currentScene];
    }

    getSceneName(){
        const {currentScene} = store.getStore('engine').access('currentScene');
        return currentScene;
    }

    update(dt){
        const {ctx, debug, currentScene, scale} = store.getStore('engine').access('ctx', 'debug', 'currentScene', 'scale');
        const scene = this.getScene();

        // @Todo make this an option
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);

        scene.update(dt);

        event.publishImmediate('update_sys', {deltaTime: dt, entities: this.gameObject[currentScene]});
        
        scene.draw(dt);

        event.finalize();
        
        if (debug){
            ctx.font = `${20/scale}px Arial'`;
            ctx.fillStyle = 'red';
            
            ctx.fillText(`FPS: ${Math.floor(1/(dt/1000))}`, ((ctx.canvas.clientWidth/scale - 80 - 1)), 10);
        }
    }

    addGameObjects(go){
        const {currentScene} = store.getStore('engine').access('currentScene');
        if(Array.isArray(go)){
            this.gameObject[currentScene].addGameObject(go);
        } else {
            this.gameObject[currentScene].addGameObject([go]);
        }
    }

    createAPI(renderer){
        return {
            addMap: (map, spriteSheet)=> { this.addGameObjects(loadMap(map, spriteSheet))},
            createEntity: (componentsList) => {
                this.addGameObjects([componentsList]);
            },
            addGameObject: (data)=>this.addGameObjects(data),
            getStore: (key?: string) => {
                return store.getStore('user').access(key);
            },
            getCamera: () => {
                return store.getStore('engine').access('camera');
            },
            nextScene: (scene: string) => store.getStore('engine').update('currentScene', scene),
            ...renderer()
        }
    }
}

function createSystemsList(systems: any, userSystems: any): System_Base[]{
    return [...systems, ...userSystems].map(system =>{
        let s = new system();
        event.subscribe('init_sys', s.init.bind(s));
        event.subscribe('update_sys', s.update.bind(s));
        return s;
    }).sort((a,b) => a.order < b.order ? -1 : 1);
}


export default System_Handler;