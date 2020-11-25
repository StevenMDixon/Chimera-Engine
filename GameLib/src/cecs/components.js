import Vector2D from '../utils/vector';
import {createVertices} from '../utils/utils';

export class Component{
    constructor(){
        this.gameObject = null;
    }
}

class Player extends Component{};

class Solid extends Component{};

class Renderable extends Component{};

class Viewable extends Component{}

class Movable extends Component{};

class Bounce extends Component{
    constructor(value){
        super();
        this.bounce = value || 5;
    }
}

class Gravity extends Component{
    constructor(value){
        super();
        this.gravity = new Vector2D(0, value || .1);
    }
};

class Inputs extends Component{
    constructor(){
        super();
        this.inputs = {};
    }
};

class CameraFocus extends Component{};

class Killable extends Component{
    constructor(){
        super();
        this.dead = false;
    }
}

class zIndex extends Component{
    constructor(index){
        super();
        this.index = index;
    }
};

class Animate extends Component{
    constructor(map){
        super();
        this.map = map;
    }
};

class Sprite extends Component{
    constructor(spriteSheet){
        super();
        this.spriteSheetName = spriteSheet;
    }
};

class State extends Component{
    constructor(currentState){
        super();
        this.state = currentState;
    }
};

class Entity extends Component{

    constructor(entityType, sheetType){
        super();
        this.entityType = entityType;
        this.sheetType = sheetType;
    }
};

class Tile extends Component{
    constructor(type, sheetType){
        super();
        this.tileType = type;
        this.sheetType = sheetType;
    }
};

class Position extends Component{
    constructor(x, y){
        super();
        this.pos = new Vector2D(x, y);
    }
};

class Size extends Component{
    constructor(w, h){
        super();
        this.size = new Vector2D(w, h);
    }
};

class Polygon extends Component{
    constructor(vertices){
        super();
        this.vertices = createVertices(vertices);
    }
};


class Physics extends Component{
    constructor(v, f, a){
        super();
        this.velocity = v ? new Vector2D(v.x, v.y) : new Vector2D(0,0);
        this.friction = f ?  new Vector2D(f.x, f.y) : new Vector2D(.6,.6);
        this.acceleration = new Vector2D(0,0);
        this.mass = a || 1
    };
};

class Collectible extends Component{}

class Emitter extends Component{
    
}

class Particle extends Component{
    constructor(lifeTime){
        super();
        this.lifeTime = lifeTime;
        this.currentLife = 0;
    }
}


class Components{
    constructor(){
        this.comp =  {
            Player,
            Solid,
            Renderable,
            Viewable,
            Movable,
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
            Bounce,
            Collectible,
            Emitter,
            Particle 
        }
    }

    get components(){
        return this.comp;
    }

    getComponents(){
        return this.comp;
    }

    addComponents(components){
        components.forEach(com =>{
            let temp = new com({});
            this.comp[temp.constructor.name] = com;
        })
    }
}


export default new Components()