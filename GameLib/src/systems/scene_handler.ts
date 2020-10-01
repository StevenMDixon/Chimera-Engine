import Scene from '../classes/scene';
import Base_System from './system_base'
import Loader from '../modules/loader';
import Renderer from '../systems/renderer';
import Sound from '../systems/sound_handler';

class Scene_Handler extends Base_System{
    scenes: Scene[];

    constructor(store){
        super(store)
        this.scenes = [];
    }
    
    update(){
    
    }

    draw(deltaTime): void{
        const {ctx, enableDebug, camera} = this.store.access();

        // draw background
         ctx.clearRect(0,0,ctx.canvas.clientWidth, ctx.canvas.height)
         ctx.fillStyle = '#000';
         ctx.fillRect(0,0, ctx.canvas.clientWidth, ctx.canvas.height);
         //draw current scene
 
        //  let LeveltoDraw = this.screens[this.currentScreen].getLevel()
        //  if(LeveltoDraw){
        //      LeveltoDraw.draw(deltaTime, this.totalTime, this.imageManager.getLevelRenderer(), camera);
        //  }
 
 
        //  this.scenes[this.currentScreen].draw(
        //      renderer.getTools(),
        //      camera.getCameraTools()
        //  );
         
         // draw debug info
         if (enableDebug){
             ctx.font = '10px Arial';
             ctx.fillStyle = 'red';
             ctx.fillText(`FPS: ${Math.floor(1/( deltaTime/1000))}`, ctx.canvas.width - 40, 10);
         }
         
         
     }
    }

export default Scene_Handler;