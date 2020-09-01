class EndScreen {
    constructor(ctx, canvas, scale, nextScene){
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
        this.nextScene = nextScene;
    }

    update(dt){

    }

    draw(dt){
        this.ctx.fillStyle = "Red";
        this.ctx.textAlign = "center";
        this.ctx.font = "2px Arial";
        this.ctx.fillText("Game Over", this.canvas.clientWidth/this.scale/2, this.canvas.height/this.scale/2- 3);
    }

    handleInput(event){
        if(event.keyCode > 0){
            this.nextScene('end');
        }
    }
}

export default EndScreen