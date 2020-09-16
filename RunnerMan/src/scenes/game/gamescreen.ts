import {Screen, Menu} from '../../lib/index';
import tileMap from './maps/tileMap'
import Player from './components/player';
import Tile from './components/tile';


class GameScreen extends Screen {
    xScroll: number;
    player: Player;
    tiles: Tile[];

    constructor(gameProps: any){
        super(gameProps);
        this.xScroll = 0;  
        this.player = new Player(10,(gameProps.canvas.height - 64)/this.scale,16,16,0,'player');
        this.tiles = [];
        this.loadMap();
    }

    loadMap(){
        for(let x = 0; x < tileMap.length; x++){
            for(let y = 0; y < tileMap[x].length; y++){   
                if(tileMap[x][y] > 0 )   this.tiles.push(new Tile(y*16, x*16, tileMap[x][y]))
            }
        }
    }

    update(dt){
        this.player.animate(dt);

        if(this.playerCollide()){
            this.player.collide();
        }
        this.player.move();


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
        for(let x = 0; x < this.tiles.length; x++){
                renderer.drawTile(this.tiles[x]);
        }
       
        renderer.drawSprite(this.player, this.player.x, this.player.y);
    }
    handleInput(event: KeyboardEvent){
        console.log(event)
        if(event.keyCode == 39){
            this.player.xVel += 3;
        }

        if(event.code == 'Space' && this.player.isJumping() == false){
            this.player.xVel += 15;
            this.player.jump();
        }
    }

    playerCollide(): boolean{
        let collided = false;
        for(let i = 0; i < this.tiles.length; i++){
            if(
                this.player.x < this.tiles[i].x + this.tiles[i].w &&
                this.player.x + this.player.w > this.tiles[i].x 
                && this.player.y < this.tiles[i].y + this.tiles[i].h
                && this.player.y + this.player.h > this.tiles[i].y 
                )
            {
                collided = true;
            }

        }
        console.log(collided)
        return collided
    }
}

export default GameScreen; 