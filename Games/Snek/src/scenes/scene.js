class Scene {
    constructor({ctx, canvas, scale, nextScene, updateGameStore, data}){
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
        this.nextScene = nextScene;
        this.updateGameStore = updateGameStore;
        this.data = data;
    }
    updateGameData(data){
        this.data = {...this.data, ...data};
    }
    update(deltaTime, updateStore){

    }
    draw(deltaTime){
    }

    handleInput(event){
    }
}

export default Scene;