import GameObject from './gameObject';
import Vector2D from '../modules/vector';
import {createVertices} from '../modules/utils';

export class Component{
    gameObject: GameObject;
    constructor(){
        this.gameObject = null;
    }
}

class Player extends Component{};

class Solid extends Component{};

class Renderable extends Component{};

class Movable extends Component{
};

class Bounce extends Component{
    bounce: Vector2D;
    constructor(value){
        super();
        this.bounce = value || 5;
    }
}

class Gravity extends Component{
    gravity: Vector2D;
    constructor(value){
        super();
        this.gravity = new Vector2D(0, value || .1);
    }
};

class Inputs extends Component{
    inputs: any;
    constructor(){
        super();
        this.inputs = {};
    }
};

class CameraFocus extends Component{};

class Obstructs extends Component{};

class Killable extends Component{
    dead: boolean;
    constructor(){
        super();
        this.dead = false;
    }
}

class zIndex extends Component{
    index: number;
    constructor(index: number){
        super();
        this.index = index;
    }
};

class Animate extends Component{
    map: any;
    constructor(map){
        super();
        this.map = map;
    }
};

class Sprite extends Component{
    spriteSheetName: string;
    constructor(spriteSheet: string){
        super();
        this.spriteSheetName = spriteSheet;
    }
};

class State extends Component{
    state: string;
    constructor(currentState: string){
        super();
        this.state = currentState;
    }
};

class Entity extends Component{
    entityType: number | string;
    sheetType: string;
    constructor(entityType: string, sheetType: string){
        super();
        this.entityType = entityType;
        this.sheetType = sheetType;
    }
};

class Tile extends Component{
    tileType: number | string;
    sheetType: string;
    constructor(type: string, sheetType: string){
        super();
        this.tileType = type;
        this.sheetType = sheetType;
    }
};

class Position extends Component{
    pos: Vector2D;
    constructor(x, y){
        super();
        this.pos = new Vector2D(x, y);
    }
};

class Size extends Component{
    size: Vector2D;
    constructor(w, h){
        super();
        this.size = new Vector2D(w, h);
    }
};

class Polygon extends Component{
    vertices: Vector2D[];
    constructor(vertices){
        super();
        this.vertices = createVertices(vertices);
    }
};


class Physics extends Component{
    collided: boolean;
    mass: number;
    velocity: Vector2D;
    friction: Vector2D;
    acceleration: Vector2D;
    resolve: any;
    constructor(){
        super();
        this.velocity = new Vector2D(0,0);
        this.friction = new Vector2D(.8,.8);
        this.acceleration = new Vector2D(0,0);
        this.mass = 1;
        this.collided = false;
        //this.resolve = {x: 0, y: 0}
    };
};

function Components(){
    const comp = {
        Player,
        Solid,
        Renderable,
        Movable,
        Obstructs,
        Gravity,
        Inputs,
        Killable,
        zIndex,
        Sprite,
        Animate,
        State,
        Tile,
        Position,
        Size,
        Polygon,
        Physics,
        Entity,
        CameraFocus,
        Bounce
    }

    return {
        getComponents(){
            return comp;
        },
        addComponents(components){
            components.forEach(com =>{
                comp[com] = com;
            })
        }
    }
}


export default Components()