 import { Scene } from 'GameLib';
import Player from './player';
import MapData from '../../assets/newMap.json';

 class GameScreen extends Scene {

   player: Player;
   test: {
     [key: string]: any
   }

     constructor(gameProps){
        super(gameProps);
        //this.player = new Player(0, 0, 8, 8);
        this.test = {x: 100, y: 200, w: 20, h: 20, xVelocity: 1, yVelocity: 1}
     }

     setup(){
        //this.createLevel(MapData, 'colored_tilemap');
        //this.addEntitytoCurrentLevel(this.player);
        //soundController.playBG("main", .5)
        //this.addEntitytoCurrentLevel(new Player(30, 30, 8, 8, -15));
        //this.game.getCamera().camera.attach(this.test)
     }

     update(deltaTime){

      if(this.inputs[37]){
        this.player.xVelocity = - 5;
      }
      if(this.inputs[38]){
        this.player.yVelocity =  -5;
      }
      if(this.inputs[39]){
        this.player.xVelocity = 5;
      }
      if(this.inputs[40]){
        this.player.yVelocity = 5;
      }


       //this.player.move(deltaTime);

      //this.test.x += this.test.xVelocity
       //camera.attach(this.levels[this.currentLevel].entities[1])
     }


     draw(){
      this.game.drawText("test", 20, 20, 20);
         //renderer.drawSprite(this.player);
        // console.log(camera.getOffsets())
      this.game.drawTile({spriteSheet: 'colored_tilemap', x: 20, y: 50, w: 8, h: 8, type: 2})

      this.game.drawRect(this.test.x, this.test.y, this.test.w, this.test.h, 'blue')

      this.game.drawCircle(50, 20, 10, 'yellow')

      this.game.drawLine(100,100, 100, 150, 'red')

      this.game.drawTriangle(200, 200, 190, 220, 210, 210, 'green')
     }

 }

 export default GameScreen