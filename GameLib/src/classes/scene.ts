import Level from './level';

//api
/*
    render:

    sound:


*/

class Scene {
    gotoScreen: (target: string) => void;

    levels: Level[];
    currentLevel: number;
    inputs: object;
    store: object;
    game: any;

    constructor({store, api}){
        this.levels = [];
        this.currentLevel = 0;

        //this.gotoScreen = gotoScreen;
        this.store = store;
        this.inputs = {};
        this.game = api
    }

    setup(){
        // this runs one time and first
    }
    

    update(deltaTime: number): void{

    }

    draw(deltaTime: number): void{
        
    }

    handleInput(inputs): void{
        this.inputs = inputs
    }

    gotoNextScreen(target: string): void {
       // this.gotoScreen(target);
    }

    createLevel(map, spriteSheet?){
        this.levels.push(new Level(map, spriteSheet));
    }
    
    getLevel(){
        return this.levels[this.currentLevel];
    }

    addEntitytoCurrentLevel(object){
        this.levels[this.currentLevel].addEntity(object);
    }
}

export default Scene;