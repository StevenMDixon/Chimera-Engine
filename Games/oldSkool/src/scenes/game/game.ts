import {Scene} from 'GameLib';
import MapData from '../../assets/newMap.json';
import {Player} from './player';

 class GameScreen extends Scene {


   test: {
     [key: string]: any
   }

     constructor(gameProps){
        super(gameProps);
     }

     setup(){
        this.game.addMap(MapData, 'colored_tilemap');
        this.game.createEntity(Player());
     }

     update(deltaTime){
      
     }

     draw(){
     }

 }

 export default GameScreen