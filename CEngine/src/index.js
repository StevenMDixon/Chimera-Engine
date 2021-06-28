import Vector from './libs/vectors';
import utils from './libs/utils';
import Collision from './libs/collision';
import {system, components} from './modules/ecs';
import engine from './core';
import {PixiScene} from './pixi_templates/index';

// engine: new GameEngine(),
// sceneTemplates: {PixiScene},
// systemTemplate: system,
// components: components.comp,
// Vector

export {Vector, system as systemTemplate, PixiScene as Scene, engine, utils, Collision};


export default {
    engine,
    sceneTemplates: {PixiScene},
    systemTemplate: system,
    components: components.comp,
    Vector,
    utils, 
    Collision
}