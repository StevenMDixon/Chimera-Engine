
// import game library to handle the game
import {GameManager} from 'GameLib';

//import user defined scenes
import StartScreen from './scenes/start/startScreen';
import GameScreen from './scenes/game/game';

// import user defined sounds
//import sounds from './sounds';
// import user defined images
//import images from './assets/images'
import TileData from './assets/tiles.json';
//create a new game object
const myGame = new GameManager();

//tell the game to use the canvas object with and id of game and a scale of 1 and tell it which screen to start on
myGame.setup(
    {
        target: 'game',
        scale: 1,
        startingScreen: 'StartScreen',
        size: {h: 400, w: 400},
        useController: true,
        debug: false
});

//use custom mapping for controller
myGame.useCustomControllerMap({
    //0: 39
})

// load user defined sounds into game
//myGame.addSounds(sounds);
// load user defined images into game
myGame.addSprites(TileData);

// set default data across screens
myGame.addData({
    
})
// load user defined screens into game
myGame.addScreens(
    {
        StartScreen,
        GameScreen
    }
);

// tell the game manager to start the game with the defined resources
myGame.start();