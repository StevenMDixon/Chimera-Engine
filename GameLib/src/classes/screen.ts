import Tile from './tile';
import Level from './level';

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

    tiles: Tile[];
    
    constructor({ctx, canvas, scale, gotoScreen, data}: ScreenData){
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
        this.gotoScreen = gotoScreen;
        this.data = data;
        this.levels = [];
        this.currentLevel = 0;
    }

    setup(){

    }
    updateGameData(data: object): void{
        this.data = {...this.data, ...data};
    }
    update(deltaTime: number, updateStore: object, soundController: object): void{

    }
    draw(deltaTime: number, images: object): void{
        
    }
    handleInput(event: object): void{

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
}

export default Screen;