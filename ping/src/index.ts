
import Game from './managers/gameManager';

import StartScene from './scenes/startScene';

import sounds from './sounds';


const myGame = new Game();
myGame.setup('game', 1);

myGame.loadSounds(sounds);

myGame.addScenes(
    [
        StartScene
    ]
);



myGame.start();