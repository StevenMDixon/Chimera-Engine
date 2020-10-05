 import { Scene, Vector } from 'GameLib';
import Player from './player';
import MapData from '../../assets/newMap.json';

 class GameScreen extends Scene {

   player: Player;
   test: {
     [key: string]: any
   }

     constructor(gameProps){
        super(gameProps);
        this.player = new Player(10, 10, 8, 8);
        this.player.addTrait('move');
     }

     setup(){
        this.game.createLevel(MapData, 'colored_tilemap');
        //this.addEntitytoCurrentLevel(this.player);
     }

     update(deltaTime){
      if(this.inputs[37]){
        this.player.acceleration.add(new Vector(-1, 0))
      }
      if(this.inputs[38]){
        this.player.acceleration.add(new Vector(0, -1))
      }
      if(this.inputs[39]){
        this.player.acceleration.add(new Vector(1, 0))
      }
      if(this.inputs[40]){
        this.player.acceleration.add(new Vector(0, 1))
      }

      this.player.move(deltaTime)
     }


     draw(){
      this.game.drawSprite(this.player);
     }

 }

 export default GameScreen