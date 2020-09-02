import Player from '../player';
import Arena from '../arena';
import Scene from './scene.js'


class GameScreen extends Scene{
    constructor(gameProps) {
        super(gameProps);
        this.player = new Player((this.canvas.height/ this.scale),(this.canvas.clientWidth / this.scale));
        this.arena = new Arena((this.canvas.height/ this.scale),(this.canvas.clientWidth / this.scale));
        this.dropInterval = 1000;
        this.dropCounter = 0;
        this.score = 0;
        this.collided = false;
    }
    update(dt){
        this.dropCounter += dt;
        if(this.dropCounter > this.dropInterval) {
            this.drop();
        } 
    }
    draw(dt){
        this.drawMatrix(this.arena, '#ff0ff0', 'matrix');
        //draw player
        this.drawMatrix(this.player, '#fff', 'piece');
    }
    handleInput(event){
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
        else if (event.keyCode == 82){
            this.reset();
        }
    }
    handleRotation(dir){
        this.player.rotate(dir);
        if(this.collide()){
            this.player.rotate(-dir);
        }
    }
    drop(){
        this.player.loc.y += 1;
            this.dropCounter = 0;
            if(this.collide()){
                this.player.loc.y -= 1;
                this.arena.merge(this.player.piece, this.player.loc);
                this.player.reset();
                this.arena.clearRows();
                this.checkForEnd();

            } 
            else {
                this.collided = false;
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
    }
    reset(){
        this.player.reset();
        this.arena.clearAll();
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
    checkForEnd(){
        if(this.collide()){
            this.nextScene();
        }
    }
}

export default GameScreen;