
// import game library to handle the game
import {GameManager} from './lib/index';

//import user defined scenes
import StartScreen from './scenes/start/startScreen';
import GameScreen from './scenes/game/gamescreen';

// import user defined sounds
import sounds from './sounds';
// import user defined images
import {images} from './image'
//create a new game object
const myGame = new GameManager();

//tell the game to use the canvas object with and id of game and a scale of 1 and tell it which screen to start on
myGame.setup(
    {
        target: 'game',
        scale: 1,
        startingScreen: 'GameScreen',
        size: {h: 240, w: 608},
        useController: true
    });
// load user defined sounds into game
myGame.useCustomControllerMap({
    0: 39
})



myGame.addSounds(sounds);

myGame.addImages(images);

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