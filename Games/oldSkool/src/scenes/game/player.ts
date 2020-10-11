import {Components} from 'GameLib';


export function Player(){
    let comp = Components.getComponents();
    return [
        {component: comp.Position, values: "15,15"},
        {component: comp.Size, values: "8,8"},
        {component: comp.Sprite, values: "colored_tilemap"},
        {component: comp.Renderable, values: ""},
        {component: comp.Entity, values: "5,Tiled"},
        {component: comp.Player, values: ""},
        {component: comp.Movable, values: ""},
        {component: comp.Inputs, values: ""},
        {component: comp.CameraFocus, values: ""},
        {component: comp.Physics, values: ""},
        {component: comp.Solid, values: ""},
        //{component: comp.Gravity, values: ".5"},
        {component: comp.Bounce, values: "2"}
      ]; 
}
