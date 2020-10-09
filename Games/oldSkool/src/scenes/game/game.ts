 import {Scene, Components} from 'GameLib';
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
        this.game.addMap(MapData, 'colored_tilemap');
        let comp = Components.getComponents();
        let Player = [
          {component: comp.Position, values: "15,15"},
          {component: comp.Size, values: "8,8"},
          {component: comp.Sprite, values: "colored_tilemap"},
          {component: comp.Renderable, values: ""},
          {component: comp.Entity, values: "3,Tiled"},
          {component: comp.Player, values: ""},
        ]; 

        this.game.createEntity(Player);
     }

     update(deltaTime){
      
     }

     draw(){
     }

 }

 export default GameScreen