import Player from './player';
import Arena from './arena';

class Game {
    constructor() {
        this.scale = 20
        this.ctx = null;
        this.canvas = null;
        this.player = null;
        this.arena = null
        this.lastTime = 0;
        this.dropInterval = 1000;
        this.dropCounter = 0;
        this.score = 0;
    }
    setup(){
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.scale, this.scale);
        this.player = new Player((this.canvas.height/ this.scale),(this.canvas.clientWidth / this.scale));
        this.arena = new Arena((this.canvas.height/ this.scale),(this.canvas.clientWidth / this.scale));
        this.handleInput();
        this.update();
    }
    update(time = 0){
        const dt = time - this.lastTime;
        this.lastTime = time;
        this.dropCounter += dt;
        if(this.dropCounter > this.dropInterval) {
            this.drop();
        } 
        this.draw();   
        requestAnimationFrame((time) => this.update(time));
    }
    drop(){
        this.player.loc.y += 1;
            this.dropCounter = 0;
            if(this.collide()){
                this.player.loc.y -= 1;
                this.arena.merge(this.player.piece, this.player.loc);
                this.player.reset();
                this.arena.clearRows();
            }
    }
    draw(){
        //draw background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0, this.canvas.clientWidth, this.canvas.height);
         // draw arena
         this.drawMatrix(this.arena, '#ff0ff0', 'matrix');
        //draw player
        this.drawMatrix(this.player, '#fff', 'piece');
       
    }
    handleRotation(dir){
        this.player.rotate(dir);
        if(this.collide()){
            this.player.rotate(-dir);
        }
    }
    handleInput(){
        document.addEventListener('keydown', event => {
            if(event.keyCode === 37){
                this.player.move(-1);
                if(this.collide()){
                    this.player.move(1);
                }
            }
            else if(event.keyCode === 39){
                this.player.move(1);
                if(this.collide()){
                this.player.move(-1);
                }
            }
            else if (event.keyCode == 40){
                this.drop();
            }
            else if (event.keyCode == 81) {
                this.handleRotation(-1);
               
            }
            else if (event.keyCode == 87) {
                this.handleRotation(1);
            }
        })
    }
    drawMatrix(object, color, target){
        this.ctx.fillStyle = color;
        for(let i = 0; i < object[target].length; i++){
            for(let j = 0; j < object[target][i].length; j++){
                if(object[target][i][j] > 0){
                    this.ctx.fillRect(object.loc.x + j, object.loc.y + i, 1, 1);
                }
            }
        }
    }
    collide(){
        const m = this.player.piece;
        const o = this.player.loc;
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                   (this.arena.matrix[y + o.y] &&
                    this.arena.matrix[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
}}


const myGame = new Game();
myGame.setup();