import Vector from '../../../libs/vectors';
import System from '../system';

class PixiCamera extends System {
    constructor(){
        super();
        this.targetComponents = ["CameraFocus"];
        this.excludeComponents = [];
        this.once = 0;
    }

    onCreate(){}

    update(next, dt){
        for(const [i, entity] of this.cachedEntities){
            const {pixi} = entity.components.get('Pixi');
            const {primary} = entity.components.get('CameraFocus');
            const Transform = entity.components.get('Transform');
            const Renderer = this._sceneContext.global.renderer; 
            if(!primary) continue;

            let CameraResVector = new Vector(this._sceneContext.stage.pivot._x, this._sceneContext.stage.pivot._y);
            CameraResVector.vLinearInt(Transform.pos, dt/1000);

            if(this.once < 100){
                // console.log(this._sceneContext.stage.pivot);
                // console.log(CameraResVector.get())
                // console.log(Transform.pos)
                this.once++;
            }


            //const n = nc.pos.vLinearInt(p['pos'], (deltaTime/ (100 * camera.options.smoothing)) * camera.options.damping )

            this._sceneContext.stage.pivot.set(CameraResVector.x, CameraResVector.y)
            this._sceneContext.stage.position.set(Renderer._h/2, Renderer._w/2);
            //this._stage.pivot.set(this.player.x, this.player.y)
        }
    }

    
}

export default PixiCamera;


// camera.position.set(renderer.screen.width/2, renderer.screen.height/2);
// camera.pivot.copy(player.position);

// //EVERY FRAME

// var targetPivot = player.position;

// //LERP IT, dt is something between 0 and 1.
// // i use dt = 1 - Math.exp(-deltaInMillis / 100);
// // or you can just assign targetpivot to pivot
// camera.pivot.x = (targetPivot.x - camera.pivot.x) * dt + camera.pivot.x;
// camera.pivot.y = (targetPivot.y - camera.pivot.y) * dt + camera.pivot.y;

// //big square

// var mapRect = new PIXI.Rectangle();
// mapRect.x = camera.pivot.x - renderer.screen.width/2;
// mapRect.y = camera.pivot.x - renderer.screen.height/2;
// mapRect.width  = renderer.screen.width;
// mapRect.height = renderer.screen.height;
// mapRect.pad(400,400); // -this line was updated

// //every time camera changes position


// var newRect = new PIXI.Rectangle();
// newRect .x = camera.pivot.x - renderer.screen.width/2;
// newRect .y = camera.pivot.x - renderer.screen.height/2;
// newRect .width  = renderer.screen.width;
// newRect .height = renderer.screen.height;
// if (newRect.x < mapRect.x || newRect.right > mapRect.right ||
//    newRect.y < mapRect.y ||  newRect.bottom > mapRect.bottom) {
//    mapRect = newRect;
//    //ADJUST THE BACKGROUND AND STUFF
//    //CLEAR AND FILL THE TILEMAP: https://github.com/pixijs/pixi-tilemap
// }