import * as PIXI from 'Pixi.js'
import c from 'ChimeraEngine';
import Opening from './scenes/opening';

//create game config
const gameConfig = {
    pixiSettings: {
        options: {
            size: {w: 600, h: 600},
            target: "game",
            autoResize: false,
            DPI: true
        },
        PIXI
    },
    useController: true,
    controllerMap: 'default',
    scenes: [Opening],
    debug: true
}

// set the engines config
c.engine.setConfig(gameConfig);

//loading globally needed items this will be passed into PIXI loader.
c.engine.load(
    {name: 'player', file: "./images/player.png"}
);

c.engine.start();