import {Screen, Menu} from '../../lib/index';
import tileMap from './maps/tileMap'


const player = {
    x: 100,
    y: 100,
    w: 16,
    h: 16,
    currentFrame: 0,
    state: 'run',
    sprite: 'player',
    animate: function(dt){
        console.log(dt)
        this.currentFrame = Math.ceil(((this.currentFrame + 1) % 5) / 2)
        console.log(this.currentFrame)
    }
}

const frameL = 100;
let amount = 0;

class GameScreen extends Screen {
    xScroll: number

    constructor(gameProps: any){
        super(gameProps);
        this.xScroll = 0;  
    }
    update(dt){
        //console.log(++player.currentFrame % 5)

        // amount += dt;

        // if (amount > frameL){
        //     player.currentFrame += 1;
        //     if(player.currentFrame >= 5){
        //         player.currentFrame = 0
        //     }
        //     amount = 0;
        // }

        player.animate(dt)

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
       
        renderer.drawSprite(player, 100, 100, 0);
    }
    handleInput(event: KeyboardEvent){
        
    }
}

export default GameScreen; 