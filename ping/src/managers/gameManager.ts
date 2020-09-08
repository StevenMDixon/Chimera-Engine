import DataManager from './dataManager';
import SoundManager from './soundManager';

interface Scene {
    updateGameData(fn: object): void;
    update(dt: number, fn: object, fn2: object): void;
    draw(dt: number): void;
    handleInput(event: object): void;
}

class Game {
        scale: number;
        ctx: any;
        canvas: any;
        lastTime: number;
        originalScenes : object[];
        scenes: Scene[];
        currentScene: number;
        dataMan: any;
        soundManager: any;
         
    constructor() {
        this.scale = 1;
        this.ctx = null;
        this.canvas = null;
        this.lastTime = 0;
        this.originalScenes = [];
        this.scenes = [];
        this.currentScene = 0;
        this.dataMan = null;
    }
    setup(target: string, scale: number): void {
        this.canvas = document.getElementById(target);
        this.ctx = this.canvas.getContext('2d');
        this.scale = scale;
        this.ctx.scale(scale, scale);
        this.dataMan = new DataManager({
            score: 0
        });
        this.soundManager = new SoundManager();
    }
    start(): void{
        this.handleInput();
        this.update();
    }
    update(time: number = 0): void{
        const dt = time - this.lastTime;
        this.lastTime = time;
        this.scenes[this.currentScene].updateGameData(this.dataMan.store);
        this.scenes[this.currentScene].update(dt, this.dataMan.update.bind(this.dataMan), this.soundManager.playEffect.bind(this.soundManager));
        this.draw(dt);   
        requestAnimationFrame((time) => this.update(time));
    }
    draw(dt): void{
        //draw background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0, this.canvas.clientWidth, this.canvas.height);
         // draw current scene
        this.scenes[this.currentScene].draw(dt);
    }
    handleInput(): void{
       // this.InputHandler.startListening().then(e => console.log(e))
        document.addEventListener('keydown', event => {this.scenes[this.currentScene].handleInput(event)})
    }
    addScenes(scenes): void{
        this.originalScenes = scenes;
        this.setupScenes(scenes);
    }
    setupScenes(scenes): void{
        scenes.forEach(scene => this.scenes.push(new scene(
            {
                ctx: this.ctx, 
                canvas: this.canvas, 
                scale: this.scale, 
                nextScene: this.nextScene.bind(this),
                data: this.dataMan.store
            })));
    }
    nextScene(com): void{
        if(com == 'end'){
            this.resetGame();
        }else{
            // check to see if there is a next scene
            if(this.currentScene < this.scenes.length)
            this.currentScene +=1;
        }
    }
    resetGame(): void{
        this.lastTime = 0;
        this.scenes = [];
        this.currentScene = 0;
        this.setupScenes(this.originalScenes);
    }
    loadSounds(sounds): void{
        this.soundManager.addSounds(sounds);
    }
}

export default Game;