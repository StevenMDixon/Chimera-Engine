import Pixi_Transform from './pixi_transform';
import Pixi_Animate from './pixi_animate';
import Input_System from './input_system';
import Command_System from './command_system'
import Collision_System from './collision_system';
import View_System from './view_system';
import Pixi_Camera from './pixi_camera';

const built_in = [
    View_System,
    Collision_System,
    Input_System,
    Pixi_Animate,
    Command_System,
    Pixi_Transform,
    Pixi_Camera
]

export default built_in;