import ECSManager from './ECSmanager';
import system from './system'
import components from './components'
import Pixi_System from './built_in/pixi_system';
import Input_System from './built_in/input_system';

const built_in = [
    Pixi_System,
    Input_System
]

export {ECSManager, system, built_in, components}