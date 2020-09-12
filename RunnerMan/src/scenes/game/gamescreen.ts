import {Screen, Menu} from '../../lib/index';



class GameScreen extends Screen {

    constructor(gameProps: any){
        super(gameProps);

    }
    draw(delta, renderer){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Orbitron";
        renderer.drawTile(0, 16,16);
        renderer.drawTile(0, 32,16);
        renderer.drawTile(0, 48,16);
        renderer.drawTile(0, 64,16);

        renderer.drawSprite('player', 'idle', 100, 100, 180);
        renderer.drawSprite('player', 'idle', 116, 100);
    }
    handleInput(event: KeyboardEvent){
        
    }
}

export default GameScreen;