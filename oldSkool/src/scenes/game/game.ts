 import { Screen } from 'GameLib';
import Player from './player';
import MapData from '../../assets/map.json';


 class GameScreen extends Screen {

   player: Player;

     constructor(gameProps){
        super(gameProps);
        this.player = new Player(0, 0, 8, 8);
     }


     setup(){
        this.createLevel(MapData);
        this.addEntitytoCurrentLevel(this.player);
     }

     update(deltaTime, updateStore, soundController, camera){

      if(this.inputs[37]){
        this.player.xVelocity = - 10;
      }
      if(this.inputs[38]){
        this.player.yVelocity =  -10;
      }
      if(this.inputs[39]){
        this.player.xVelocity = 10;
      }
      if(this.inputs[40]){
        this.player.yVelocity = 10;
      }


       this.player.move(deltaTime);


       //camera.attach(this.levels[this.currentLevel].entities[1])
     }


     draw(delta, renderer){
         //renderer.drawSprite(this.player);
     }

 }

 export default GameScreen