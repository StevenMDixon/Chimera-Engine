import ECSManager from './ECSmanager';
import system from './system'
import components from './components'
import Pixi_Transform from './built_in/pixi_transform';
import Pixi_Animate from './built_in/pixi_animate';
import Input_System from './built_in/input_system';

const built_in = [
    Pixi_Transform,
    Input_System,
    Pixi_Animate
]

export {ECSManager, system, built_in, components};