import {Scene, Event} from 'GameLib';
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
        Event.subscribe('entity_collides', (data)=>this.collisions(data));
     }

     collisions(data){
      //console.log(this, data)
     }

     update(deltaTime){
      
     }

     draw(){

     }

     input_event(inputs){
      //console.log(inputs)
     }
 }

 export default GameScreen