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
        this.ctx.fillText("Runner Man", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2);

        if (this.displayMenu){
            this.ctx.fillStyle = "White";
            this.menus[this.currentMenu].draw(this.ctx);
        }
    }
    handleInput(event: KeyboardEvent){
        if (this.displayMenu){
           let o =  this.menus[this.currentMenu].handleInput(event.keyCode);
           console.log(o)

           if(o === 'Start Game'){
               this.gotoNextScreen('GameScreen')
           }
        }
        if(event.keyCode > 0){
            //this.gotoNextScreen('GameScreen');
        }
    }
}

export default StartScreen;