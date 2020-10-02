 import { Scene } from 'GameLib';
import Player from './player';
import MapData from '../../assets/newMap.json';


 class GameScreen extends Scene {

   player: Player;

     constructor(gameProps){
        super(gameProps);
        this.player = new Player(0, 0, 8, 8);
     }

     setup(){
        this.createLevel(MapData, 'colored_tilemap');
        this.addEntitytoCurrentLevel(this.player);
       // soundController.playBG("main", .5)
        //this.addEntitytoCurrentLevel(new Player(30, 30, 8, 8, -15));
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


       this.player.move(deltaTime);


       //camera.attach(this.levels[this.currentLevel].entities[1])
     }


     draw(){

      this.game.drawText("test", 0, 0)
         //renderer.drawSprite(this.player);
        // console.log(camera.getOffsets())
     }

 }

 export default GameScreen