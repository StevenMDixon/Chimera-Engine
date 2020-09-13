import {Screen, Menu} from '../../lib/index';
import tileMap from './maps/tileMap'
import Player from './components/player';



class GameScreen extends Screen {
    xScroll: number;
    player: Player;

    constructor(gameProps: any){
        super(gameProps);
        this.xScroll = 0;  
        this.player = new Player(0,0,16,16,0,'player');
    }
    update(dt){

        this.player.animate(dt);

    }
    draw(delta, renderer){
        // scrolling background effect
        renderer.drawBackGround('bg', this.xScroll,0);
        renderer.drawBackGround('bg', this.xScroll - this.canvas.width,0);
        this.xScroll += 20 * delta/ 1000;
        if(this.xScroll >= this.canvas.width){
            this.xScroll = 0;
        }
        
        // draw the tile map
        for(let x = 0; x < tileMap.length; x++){
            for(let y = 0; y < tileMap[x].length; y++){
                renderer.drawTile(tileMap[x][y], y * 16, x * 16);
            }
        }
       
        renderer.drawSprite(this.player, this.player.x, this.player.y);
    }
    handleInput(event: KeyboardEvent){
        
    }
}

export default GameScreen; 