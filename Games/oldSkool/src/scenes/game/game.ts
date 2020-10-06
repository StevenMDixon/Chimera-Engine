 import { Scene} from 'GameLib';
import Player from './player';
import MapData from '../../assets/newMap.json';

 class GameScreen extends Scene {

   player: Player;
   test: {
     [key: string]: any
   }

     constructor(gameProps){
        super(gameProps);
  
        //console.log(Components.getComponents())
     }

     setup(){
        //this.game.createLevel(MapData, 'colored_tilemap');
        //this.addEntitytoCurrentLevel(this.player);
     }

     update(deltaTime){

     }

     draw(){
     
     }

 }

 export default GameScreen