import {Components} from 'GameLib';


export function Player(){
    let comp = Components.getComponents();
    return [
        new comp.Position(15,15),
        new comp.Size(8,8),
        new comp.Sprite("player"),
        new comp.Renderable(),
        new comp.Entity(5,"Tiled"),
        new comp.Player(),
        new comp.Movable(),
        new comp.Inputs(),
        new comp.CameraFocus(),
        new comp.Physics(),
        new comp.Solid(),
        //{component: comp.Gravity, values: ".5"},
        //{component: comp.Bounce, values: "1"}
        //,new comp.Gravity(.3),
        new comp.State('idle'),
        new comp.Animate({
          'idle': 0,
          'walk-up': 2,
          'walk': 5
        })
      ]; 
    
}
