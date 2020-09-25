import Level from '../classes/level';

interface ScreenData {
    ctx: any,
    canvas: any,
    scale: number,
    gotoScreen: () => void,
    data: any
    
}

class Screen {
    scale : number;
    ctx: any;
    canvas: any;
    data: object;
    gotoScreen: (target: string) => void;
    updateGameStore: (data: any) => void;

    levels: Level[];
    currentLevel: number;
    inputs: object;

    constructor({ctx, canvas, scale, gotoScreen, data}: ScreenData){
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
        this.gotoScreen = gotoScreen;
        this.data = data;
        this.levels = [];
        this.currentLevel = 0;
        this.inputs = {};
    }

    setup(){

    }
    updateGameData(data: object): void{
        this.data = {...this.data, ...data};
    }
    update(deltaTime: number, updateStore: object, soundController: object, camera: object): void{

    }
    draw(deltaTime: number, images: object): void{
        
    }
    handleInput(inputs): void{
        this.inputs = inputs
    }
    gotoNextScreen(target: string): void {
        this.gotoScreen(target);
    }

    createLevel(map){
        this.levels.push(new Level(map));
    }
    
    getLevel(){
        return this.levels[this.currentLevel];
    }

    addEntitytoCurrentLevel(object){
        this.levels[this.currentLevel].addEntity(object);
    }
}

export default Screen;