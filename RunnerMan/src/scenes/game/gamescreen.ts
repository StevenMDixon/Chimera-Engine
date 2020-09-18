import {Screen, Menu, Emitter} from '../../lib/index';
import tileMap from './maps/tileMap'
import Player from './components/player';
import Tile from './components/tile';
import Box from './components/boxes';

class GameScreen extends Screen {
    xScroll: number;
    player: Player;
    boxes: Box[];
    tiles: Tile[];
    emitters: Emitter[];
    maxBoxes: number;


    constructor(gameProps: any){
        super(gameProps);
        this.xScroll = 0;  
        this.player = new Player(20,(gameProps.canvas.height - 32)/this.scale,16,16,0,'player');
        this.tiles = [];
        this.boxes = [];
        this.emitters = [];
        this.maxBoxes = 5;
        
    }

    setup(){
        this.loadAssets();
    }

    loadAssets(){
        this.emitters.push(
            new Emitter(100, 100, 1, 1, 5,
                {
                    w: 16,
                    h: 16,
                    maxLife: 4,
                    xVel:  -5,
                    movement: {
                        x: (x, v) => x + v,
                        y: (y, v) => y 
                    },
                    color: 'blue',
                    opacity: .3,
                    spriteSheet: 'player',
                    map: {
                        x: (x, w) => x + w/2,
                        y: y => y
                    }
                })
        )

        this.emitters[0].attach(this.player);

        for(let i = 0; i < 5; i++){
            let x = Math.floor((Math.random() * this.canvas.width) + 32) + this.canvas.width
            this.boxes.push(
                new Box (
                    x,
                    this.canvas.height - 32,
                    16,
                    16
                )
            )
        }


        this.emitters.push(
            new Emitter(this.canvas.width/ 2, 0, this.canvas.width, this.canvas.height- 20, 30, {
                maxLife: -1,
                xVel: -.5,
                color: 'white'
            },
            ()=>{return true},
            ({x})=> {
                return x < 0
            }
            )
        );

        for(let x = 0; x < tileMap.length; x++){
            for(let y = 0; y < tileMap[x].length; y++){   
                if(tileMap[x][y] > 0 )   this.tiles.push(new Tile(y*16, x*16, tileMap[x][y]))
            }
        }
    }

    update(dt, store){
        this.player.animate(dt);

        if(this.playerCollide()){
            this.player.collide();
        }

        this.emitters.forEach(e => e.update(dt));
        this.boxes.forEach( b => 
            {
            b.move(dt);
           
             if(b.x + b.w < 0 ){
                 b.reset(16, this.canvas.width);
             }
            })
        this.player.move();

        if(this.objectCollide(this.player, this.boxes)){
            this.gotoNextScreen('EndScreen');
        }
        
       store.update({distance: this.data.distance + 1 })
    }
    draw(delta, renderer){
        // scrolling background effect
        // renderer.drawBackGround('bg', this.xScroll,0);
        // renderer.drawBackGround('bg', this.xScroll - this.canvas.width,0);
        // this.xScroll += 20 * delta/ 1000;
        // if(this.xScroll >= this.canvas.width){
        //     this.xScroll = 0;
        // }

        var grd = this.ctx.createLinearGradient(0, 0, 0, 300);
        grd.addColorStop(0, "Black");
        grd.addColorStop(.6, "blue");
        grd.addColorStop(.8, "#B326FF");

        // Fill with gradient
        this.ctx.fillStyle = grd;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // draw the tile map
        for(let x = 0; x < this.tiles.length; x++){
                renderer.drawTile(this.tiles[x]);
        }

        this.emitters.forEach( e => e.getParticles().forEach(particle => renderer.drawParticle(particle)));
       
        this.boxes.forEach( b => renderer.drawSprite(b));

        renderer.drawSprite(this.player, this.player.x, this.player.y);

        renderer.drawText(`Score: ${this.data.distance}`, 10 , 10);
    }
    handleInput(event: KeyboardEvent){
       

        if((event.code == 'Space' || event.keyCode === 32) && this.player.isJumping() == false){
             
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
        return collided
    }

    objectCollide(object, objects) : boolean {
        let collided = false

        for(let i = 0; i < objects.length; i++){
            if(this.collided(object, objects[i])){
                collided = true;
            }
        }
        return collided
    }


    collided(object1, object2 ): boolean{
        if(
            object1.x < object2.x + object2.w &&
            object1.x + object1.w > object2.x 
            && object1.y < object2.y + object2.h
            && object1.y + object1.h > object2.y 
            )
        {
            return true;
        }
        return false
    }   
}

export default GameScreen; 