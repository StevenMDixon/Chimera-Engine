import {Scene, Menu}  from 'GameLib';

class StartScreen extends Scene {
    menus: Menu[];
    displayMenu: Boolean;
    currentMenu = 0;

    constructor(gameProps: any){
        super(gameProps);
    }
    draw(){
        this.game.drawText("test", 10, 10);

        // this.ctx.fillStyle = "White";
        // this.ctx.textAlign = "center";
        // this.ctx.font = "20px Orbitron";
        // this.ctx.fillText("This is the template", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);

        // if (this.displayMenu){
        //     this.ctx.fillStyle = "White";
        //     this.menus[this.currentMenu].draw(this.ctx);
        // }
    }

    handleInput(event: KeyboardEvent){
        this.game.nextScene('GameScreen');
    }
}

export default StartScreen;