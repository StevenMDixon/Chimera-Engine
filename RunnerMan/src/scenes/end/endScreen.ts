import {Screen, Menu} from '../../lib/index';

class StartScreen extends Screen {
    menus: Menu[];
    displayMenu: Boolean;
    currentMenu = 0;

    constructor(gameProps: any){
        super(gameProps);

        this.menus = [new Menu(
                {
                 x: gameProps.canvas.clientWidth/ 2, 
                 y: gameProps.canvas.height/ 2 + 30,
                 optionsList: [ 'Start Game'],
                 buttons: {
                    32: 'accept',
                    38: 'up',
                    40: 'down'
                 },
                 fontSize: 18,
                 vSpace: 10,
                 font: 'Orbitron'
                }
            )]
        
            this.displayMenu = true;
            this.currentMenu = 0;
    }
    draw(){
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Orbitron";
        this.ctx.fillText("Game Over", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);
        this.ctx.fillText("Score", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2 + 20);
        this.ctx.fillText(`${this.data.distance}`, this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2 + 40);

    }
    handleInput(event: KeyboardEvent){
        
    }
}

export default StartScreen;