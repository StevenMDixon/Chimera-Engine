// import game library to handle the game
import {GameManager} from 'GameLib';
import Movement_System from './systems/movement';
import Physics_System from './systems/physics';
//import user defined scenes
import GameScreen from './scenes/game/game';

// import user defined sounds
import main from './assets/main.wav';

// import tile info and specific files to load
import TileData from './assets/newTiles.json';
import PlayerData from './assets/newPlayer.json';
import ParticleData from './assets/particles.json';
//create a new game object
const myGame = GameManager;

//tell the game to use the canvas object with and id of game and a scale of 1 and tell it which screen to start on
myGame.setup(
    {
        target: 'game',
       // scale: 1,
        size: {w: 400, h: 400},
        useController: true,
        debug: true,
        scenes: {
           //StartScreen,
           GameScreen
        },
        controllerMap: {},
        systems: [Movement_System, Physics_System]
});


myGame.loadAssets({TileData, PlayerData, ParticleData, main});

myGame.start();