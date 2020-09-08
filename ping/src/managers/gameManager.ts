import DataManager from './dataManager';
import SoundManager from './soundManager';
import Screen from './screen';

// interface Scene {
//     updateGameData(fn: object): void;
//     update(dt: number, fn: object, fn2: object): void;
//     draw(dt: number): void;
//     handleInput(event: object): void;
// }

class Game {
        scale: number;
        ctx: CanvasRenderingContext2D;
        canvas: HTMLCanvasElement;
        lastTime: number;
        originalScreens : any;
        screens: any;
        currentScreen: string;
        dataMan: any;
        soundManager: any;
         
    constructor() {
        this.scale = 1;
        this.ctx = null;
        this.canvas = null;
        this.lastTime = 0;
        this.originalScreens = {};
        this.screens = {};
        this.currentScreen = '';
        this.dataMan = null;
    }
    setup(target: string, scale: number, startingScreen: string): void {
        this.canvas = document.getElementById(target) as any;
        this.ctx = this.canvas.getContext('2d');
        this.scale = scale;
        this.ctx.scale(scale, scale);
        this.dataMan = new DataManager({
            score: 0
        });
        this.soundManager = new SoundManager();
        this.currentScreen = startingScreen;
    }
    start(): void{
        this.handleInput();
        this.update();
    }
    update(time: number = 0): void{
        const dt = time - this.lastTime;
        this.lastTime = time;
        this.screens[this.currentScreen].updateGameData(this.dataMan.store);
        this.screens[this.currentScreen].update(dt, this.dataMan.update.bind(this.dataMan), this.soundManager.playEffect.bind(this.soundManager));
        this.draw(dt);   
        requestAnimationFrame((time) => this.update(time));
    }
    draw(dt): void{
        //draw background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0, this.canvas.clientWidth, this.canvas.height);
         // draw current scene
         this.screens[this.currentScreen].draw(dt);
    }
    handleInput(): void{
       // this.InputHandler.startListening().then(e => console.log(e))
        document.addEventListener('keydown', event => {this.screens[this.currentScreen].handleInput(event)})
    }
    addScreens(screens): void{
        this.originalScreens = screens;
        this.setupScreens(screens);
    }
    setupScreens(screens): void{
        for(let screen in screens){
            this.screens[screen] = new screens[screen](
                {
                    ctx: this.ctx, 
                    canvas: this.canvas, 
                    scale: this.scale, 
                    nextScene: this.gotoScreen.bind(this),
                    data: this.dataMan.store
                })
        }

        //screens.forEach(screen => this.screens.push());
    }
    gotoScreen(target: string): void{
        this.currentScreen = target;
    }
    // resetGame(): void{
    //     this.lastTime = 0;
    //     this.screens = [];
    //     this.currentScreen = 0;
    //     this.setupScreen(this.originalScreens);
    // }
    loadSounds(sounds): void{
        this.soundManager.addSounds(sounds);
    }
}

export default Game;