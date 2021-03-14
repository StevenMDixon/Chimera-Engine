import System from '../system';

class PixiCamera extends System {
    constructor(){
        super();
        this.targetComponents = ["CameraFocusable"];
        this.excludeComponents = [];
    }

    onCreate(){}

    update(dt){
        
    }

    
}

export default PixiCamera;


camera.position.set(renderer.screen.width/2, renderer.screen.height/2);
camera.pivot.copy(player.position);

//EVERY FRAME

var targetPivot = player.position;

//LERP IT, dt is something between 0 and 1.
// i use dt = 1 - Math.exp(-deltaInMillis / 100);
// or you can just assign targetpivot to pivot
camera.pivot.x = (targetPivot.x - camera.pivot.x) * dt + camera.pivot.x;
camera.pivot.y = (targetPivot.y - camera.pivot.y) * dt + camera.pivot.y;

//big square

var mapRect = new PIXI.Rectangle();
mapRect.x = camera.pivot.x - renderer.screen.width/2;
mapRect.y = camera.pivot.x - renderer.screen.height/2;
mapRect.width  = renderer.screen.width;
mapRect.height = renderer.screen.height;
mapRect.pad(400,400); // -this line was updated

//every time camera changes position


var newRect = new PIXI.Rectangle();
newRect .x = camera.pivot.x - renderer.screen.width/2;
newRect .y = camera.pivot.x - renderer.screen.height/2;
newRect .width  = renderer.screen.width;
newRect .height = renderer.screen.height;
if (newRect.x < mapRect.x || newRect.right > mapRect.right ||
   newRect.y < mapRect.y ||  newRect.bottom > mapRect.bottom) {
   mapRect = newRect;
   //ADJUST THE BACKGROUND AND STUFF
   //CLEAR AND FILL THE TILEMAP: https://github.com/pixijs/pixi-tilemap
}