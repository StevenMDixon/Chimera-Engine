//import Scene from '../classes/scene';
import Object_Handler from '../components/object_handler';
import store from '../modules/store';
import inputSystem from './input_system';
import renderSystem from './render_system';
import System_Base from './system_base';
import {loadMap} from '../modules/loadMap';
import Renderer from '../modules/renderer';

class System_Handler{
    scenes: {
        [key: string]: any
    }

    gameObject: {
        [key: string]: Object_Handler
    }

    systems: System_Base[];

    api: any;
    renderer: any;

    constructor(){
        this.systems = [];
        this.scenes = {};
        this.gameObject = {};
        this.api = null,
        this.renderer = null
    }

    init(){
        const {systems, scenes, ctx} = store.getStore('engine').access('systems', 'scenes', 'ctx');
        //create systems with user defined systems
        this.systems = createSystemsList([renderSystem, inputSystem] ,systems);

        this.renderer = Renderer(ctx);
    
        this.api = this.createAPI(this.renderer);

        //init systems
        this.systems.forEach(system => system.init());

        store.getStore('engine').update('currentScene', Object.keys(scenes)[0])

        Object.keys(scenes).forEach(scene => {
            this.scenes[scene] = new scenes[scene](this.api);
            this.gameObject[scene] = new Object_Handler();
            this.scenes[scene].setup();
        })
    }

    getScene(){
        const {currentScene} = store.getStore('engine').access('currentScene');
        return this.scenes[currentScene];
    }

    update(dt){
        const {ctx, debug, currentScene} = store.getStore('engine').access('ctx', 'debug', 'currentScene');
        const scene = this.getScene();

        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);

        scene.update(dt);
        //camera.updateCamera();
        this.systems.forEach(system => system.update(dt, this.gameObject[currentScene].query(...system.targetComponents)));
        
        scene.draw(dt);

        if (debug){
            ctx.font = '20px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText(`FPS: ${Math.floor(1/( dt/1000))}`, ctx.canvas.width - 80, 20);
        }

        
    }

    addGameObjects(go){
        //console.log(go)
        const {currentScene} = store.getStore('engine').access('currentScene');
        this.gameObject[currentScene].addGameObject(go);
    }

    createAPI(renderer){
        const context = this;
        return {
            addMap: (map, spriteSheet)=> { this.addGameObjects(loadMap(map, spriteSheet))},
            addGameObject: this.addGameObjects.bind(context),
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
    let list = [...systems, ...userSystems].map(system => new system());
    return list.sort((a,b) => a.order < b.order ? -1 : 1);
}


export default System_Handler;