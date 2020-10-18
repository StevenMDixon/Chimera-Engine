//import Scene from '../classes/scene';
import Object_Handler from '../components/object_handler';
import store from './store';
import {loadMap} from '../modules/loadMap';
import Renderer from '../modules/renderer';
import Composer from '../modules/composer';

import inputSystem from '../component_systems/input_system';
import renderSystem from '../component_systems/render_system';
import colissionSystem from '../component_systems/collision_system';
import System_Base from '../component_systems/system_base';
import cameraSystem from '../component_systems/camera_system';

import event from './event_system';

class System_Handler{
    scenes: {
        [key: string]: any
    }

    gameObject: {
        [key: string]: Object_Handler
    }

    //systems: System_Base[];

    api: any;
    renderer: any;

    constructor(){
        //this.systems = [];
        this.scenes = {};
        this.gameObject = {};
        this.api = null,
        this.renderer = null
    }

    init(){
        const {systems, scenes, ctx} = store.getStore('engine').access('systems', 'scenes', 'ctx');
        //create systems with user defined systems
        createSystemsList([renderSystem, inputSystem, colissionSystem, cameraSystem] ,systems);
        
        //initialize renderer
        this.renderer = Renderer(ctx);
    
        event.subscribe('input_update', (data) => this.system_inputs(data));

        store.getStore('engine').update('currentScene', Object.keys(scenes)[0]);

        event.publish('init_sys');

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

    update(dt){
        const {ctx, debug, currentScene, scale} = store.getStore('engine').access('ctx', 'debug', 'currentScene', 'scale');
        const scene = this.getScene();

        // @Todo make this an option
        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);

        scene.update(dt);

        event.publish('update_sys', {deltaTime: dt, entities: this.gameObject[currentScene]});
        
        scene.draw(dt);
        
        if (debug){
            let f = 20/scale;
            ctx.font = `${f}px Arial'`;
            ctx.fillStyle = 'red';
            let t = `FPS: ${Math.floor(1/( dt/1000))}`
            ctx.fillText(t, ((ctx.canvas.clientWidth/scale - ctx.measureText(t).width - 1)), 10);
        }
    }

    addGameObjects(go){
        const {currentScene} = store.getStore('engine').access('currentScene');
        this.gameObject[currentScene].addGameObject(go);
    }

    createAPI(renderer){
        return {
            addMap: (map, spriteSheet)=> { this.addGameObjects(loadMap(map, spriteSheet))},
            createEntity: (componentsList) => {
                this.addGameObjects(Composer.compose(componentsList));
            },
            addGameObject: (data)=>this.addGameObjects(data),
            getStore: (key?: string) => {
                return store.getStore('user').access(key);
            },
            getCamera: () => {
                return store.getStore('engine').access('camera');
            },
            nextScene: (scene: string) => store.getStore('engine').update('currentScene', scene),
            ...renderer('user')
        }
    }
}

function createSystemsList(systems: any, userSystems: any): System_Base[]{
    let list = [...systems, ...userSystems].map(system =>{
        let s = new system();
        event.subscribe('init_sys', s.init.bind(s));
        event.subscribe('update_sys', s.update.bind(s));
        return s;
    });
    return list.sort((a,b) => a.order < b.order ? -1 : 1);
}


export default System_Handler;