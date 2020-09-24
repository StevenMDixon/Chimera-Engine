 import { Screen } from 'GameLib';
import Player from './player';
import MapData from '../../assets/map.json';


 class GameScreen extends Screen {

   player: Player;

     constructor(gameProps){
        super(gameProps);
        this.player = new Player(1, 1, 8, 8);
     }

     
     setup(){
        this.createLevel(MapData);
     }

     update(){
        this.player.move();
     }


     draw(delta, renderer){
         renderer.drawSprite(this.player);
         //renderer.drawTileMap(MapData, 'all');
     }

     handleInput(event: KeyboardEvent){
      
      if(event.keyCode > 38){
          this.player.xVelocity = 5;
      }
  }
 }

 export default GameScreen