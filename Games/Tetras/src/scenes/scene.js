class Scene {
    constructor({ctx, canvas, scale, nextScene}){
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
        this.nextScene = nextScene;
    }
    update(dt){
    }

    draw(dt){
    }

    handleInput(event){
    }
}

export default Scene;