 import { Screen } from 'GameLib';
import Player from './player';


 class GameScreen extends Screen {

   player: Player;

     constructor(gameProps){
        super(gameProps);
        this.player = new Player(1, 1, 8, 8);
     }


     draw(delta, renderer){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Orbitron";
        this.ctx.fillText("This is the template", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
         renderer.drawSprite(this.player);
     }
 }

 export default GameScreen