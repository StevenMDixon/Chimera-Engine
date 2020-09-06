class Game {
    constructor() {
        this.scale = 1;
        this.ctx = null;
        this.canvas = null;
        this.lastTime = 0;
        this.originalScenes = [];
        this.scenes = [];
        this.currentScene = 1;
    }
    setup(target, scale){
        this.canvas = document.getElementById(target);
        this.ctx = this.canvas.getContext('2d');
        this.scale = scale;
        this.ctx.scale(scale, scale);
    }
    start(){
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
       // this.InputHandler.startListening().then(e => console.log(e))
        document.addEventListener('keydown', event => {this.scenes[this.currentScene].handleInput(event)})
    }
    addScenes(scenes){
        this.originalScenes = scenes;
        this.setupScenes(scenes);
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
            // check to see if there is a next scene
            if(this.currentScene < this.scenes.length)
            this.currentScene +=1;
        }
    }
    resetGame(){
        this.lastTime = 0;
        this.scenes = [];
        this.currentScene = 0;
        this.setupScenes(this.originalScenes);
    }
}

export default Game;