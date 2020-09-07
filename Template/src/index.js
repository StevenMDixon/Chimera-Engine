
import StartScene from './scenes/startScene';

class Game {
    constructor() {
        this.scale = 20;
        this.ctx = null;
        this.canvas = null;
        this.lastTime = 0;
        this.scenes = [];
        this.currentScene = 0;
    }
    setup(){
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(this.scale, this.scale);
        this.setupScenes([StartScene]);
        this.handleInput();
        this.update();
    }
    update(time = 0){
        const dt = time - this.lastTime;
        this.lastTime = time;
        this.scenes[this.currentScene].update(dt);
        this.draw();   
        requestAnimationFrame((time) => this.update(time));
    }
    draw(){
        //draw background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0,0, this.canvas.clientWidth, this.canvas.height);
         // draw current scene
        this.scenes[this.currentScene].draw();
    }
    handleInput(){
        document.addEventListener('keydown', event => {this.scenes[this.currentScene].handleInput(event)})
    }
    setupScenes(scenes){
        scenes.forEach(scene => this.scenes.push(new scene(
            {
                ctx: this.ctx, 
                canvas: this.canvas, 
                scale: this.scale, 
                nextScene: this.nextScene.bind(this)
            })));
    }
    nextScene(com){
        if(com == 'end'){
            this.resetGame();
        }else{
            this.currentScene +=1;
        }
    }
    resetGame(){
        this.lastTime = 0;
        this.scenes = [];
        this.currentScene = 0;
        this.setupScenes([StartScene]);
    }
}


const myGame = new Game();
myGame.setup();