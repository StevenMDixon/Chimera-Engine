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
     }

     handleInput(event: KeyboardEvent){
      console.log(event)
      if(event.keyCode > 38){
          this.player.xVelocity = 5;
      }
  }
 }

 export default GameScreen