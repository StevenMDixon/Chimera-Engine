import Scene from '../classes/scene';
import Object_Handler from '../components/object_handler';
import store from '../modules/store';
import inputSystem from './input_system';
import renderSystem from './render_system';
import System_Base from './system_base';
import components from '../components/components';
import gameObject from '../components/gameObject';


class System_Handler{
    scenes: {
        [key: string]: Scene
    }

    gameObject: {
        [key: string]: Object_Handler
    }

    systems: System_Base[];

    constructor(){
        this.systems = [];
        this.scenes = {};
        this.gameObject = {};
    }

    init(){
        const {systems, scenes} = store.getStore('engine').access('systems', 'scenes');
        //create systems with user defined systems
        this.systems = createSystemsList([renderSystem, inputSystem] ,systems);

        Object.keys(scenes).forEach(scene => {
            this.scenes[scene] = new Scene({store: store.getStore('user'), api: {}} );
            this.gameObject[scene] = new Object_Handler();
            this.scenes[scene].setup();
        })

        store.getStore('engine').update('currentScene', Object.keys(scenes)[0])

        const {currentScene} = store.getStore('engine').access('currentScene');

        let myObject = new gameObject();
        let com = components.getComponents();
        myObject.addComponent('Position', new com.Position(10,10));
        myObject.addComponent('Size', new com.Size(10,10));
        myObject.addComponent('Renderable', new com.Renderable())

        this.gameObject[currentScene].addGameObject(myObject)
        //init systems
        this.systems.forEach(system => system.init());
    }

    update(dt){
        const {ctx, debug, currentScene} = store.getStore('engine').access('ctx', 'debug', 'currentScene');

        ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.height);

        this.scenes[currentScene].update(dt);
        //camera.updateCamera();
        this.systems.forEach(system => system.update(dt, this.gameObject[currentScene].query(...system.targetComponents)));

        this.scenes[currentScene].draw(dt);

        if (debug){
            ctx.font = '20px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText(`FPS: ${Math.floor(1/( dt/1000))}`, ctx.canvas.width - 80, 20);
        }
    }
}

function createSystemsList(systems: any, userSystems: any): System_Base[]{
    let list = [...systems, ...userSystems].map(system => new system());
    return list.sort((a,b) => a.order < b.order ? -1 : 1);
}


export default System_Handler;