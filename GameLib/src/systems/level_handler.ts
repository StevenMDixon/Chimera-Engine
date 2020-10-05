import system_base from './system_base';
import Level from '../classes/level';

class Level_handler extends system_base {
    levels: {
        [key: string]: {
            levels: Level[],
            currentLevel: number
        }      
    }

    constructor(store){
        super(store)
        this.levels = {};
    }

    getTools(){
        return {
        createLevel: this.createLevel.bind(this),
        getCurrentLevel: this.getCurrentLevel.bind(this),
        setCurrentLevel: this.setCurrentLevel.bind(this),
        getLevelObject: this.getLevelObject.bind(this)
        }
    }

    getCurrentLevel(): number{
        const {currentScene} = this.store.getStore('engine').access('currentScene');
        return this.levels[currentScene].currentLevel;
    }

    setCurrentLevel(level: number): void{
        const {currentScene} = this.store['engine'].access('currentScene');
        this.levels[currentScene].currentLevel  = level;
    }

    createLevel(map: object, spriteSheet: string): void{ 
        const {currentScene} = this.store.getStore('engine').access('currentScene');

        if(this.levels[currentScene]){
            this.levels[currentScene].levels.push(new Level(map, spriteSheet))
        }else {
            this.levels[currentScene] = {levels: [], currentLevel: 0};
            this.levels[currentScene].levels.push(new Level(map, spriteSheet))
        }
    }

    getLevelObject(): Level{
        const {currentScene} = this.store.getStore('engine').access('currentScene');
        return this.levels[currentScene].levels[this.levels[currentScene].currentLevel];
    }
}

export default Level_handler;