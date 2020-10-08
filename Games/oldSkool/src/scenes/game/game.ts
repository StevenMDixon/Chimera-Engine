 import {Scene} from 'GameLib';
import Player from './player';
import MapData from '../../assets/newMap.json';

 class GameScreen extends Scene {

   player: Player;
   test: {
     [key: string]: any
   }

     constructor(gameProps){
        super(gameProps);
     }

     setup(){
        this.game.addMap(MapData, 'colored_tilemap')
     }

     update(deltaTime){
      
     }

     draw(){
     }

 }

 export default GameScreen