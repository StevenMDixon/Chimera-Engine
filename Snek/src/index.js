
import Game from './managers/game';

import StartScene from './scenes/startScene';
import MainScene from './scenes/mainScene';
import EndScene from './scenes/endScene';



const myGame = new Game();
myGame.setup('game', 10);

myGame.addScenes(
    [
        StartScene,
        MainScene,
        EndScene
    ]
);

myGame.start();