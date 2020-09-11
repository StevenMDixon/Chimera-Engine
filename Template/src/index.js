"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import game library to handle the game
const index_1 = require("./lib/index");
//import user defined scenes
const startScreen_1 = require("./scenes/start/startScreen");
// import user defined sounds
const sounds_1 = require("./sounds");
// import user defined images
//create a new game object
const myGame = new index_1.GameManager();
//tell the game to use the canvas object with and id of game and a scale of 1 and tell it which screen to start on
myGame.setup('game', 1, 'StartScreen');
// load user defined sounds into game
myGame.loadSounds(sounds_1.default);
// todo: load user defined images into game
myGame.loadData({
    playerScore: 0,
    aiScore: 0,
    playerWin: false
});
// load user defined screens into game
myGame.addScreens({
    StartScreen: startScreen_1.default
});
// tell the game manager to start the game with the defined resources
myGame.start();
//# sourceMappingURL=index.js.map