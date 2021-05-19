import * as PIXI from 'Pixi.js';
import * as sound from 'pixi-sound';
import * as filters from 'pixi-filters';
//import * as particles from 'pixi-particles';
import c from 'ChimeraEngine';
import Opening from './scenes/opening';

//import spriteSheet from './resources/colored_tilemap.json';
import myMap from './resources/map.json';

//PIXI.particles = particles;

//create game config
const gameConfig = {
    pixiSettings: {
        options: {
            size: {w: 600, h: 600},
            target: 'game',
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
    {name: 'player', file: './images/player.png'},
    {name: 'colored_tilemap', file: './images/colored_tilemap.png'}
);

// console.log(spriteSheet)
// let t = c.engine.loadSpriteSheet(spriteSheet, 'newTiles.json');

c.engine.loadMap(myMap, 'map1')

// console.log(t)

c.engine.start();