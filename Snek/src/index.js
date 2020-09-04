
import Game from './managers/game';

import StartScene from './scenes/startScene';
import MainScene from './scenes/mainScene';



const myGame = new Game();
myGame.setup('game', 10);
myGame.addScenes(
    [
        StartScene,
        MainScene
    ]
);

myGame.start();