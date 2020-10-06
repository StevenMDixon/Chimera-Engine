import GameObject from './gameObject';
import Vector2D from '../modules/vector';

export class Component{
    gameObject: GameObject;

    constructor(){
        this.gameObject = null;
    }

    public start(): void{}

    public update(dt: number): void{};
}

class Solid extends Component{};

class Renderable extends Component{};

class Movable extends Component{};

class Gravity extends Component{};

class Inputs extends Component{};

class Killable extends Component{
    dead: boolean;
    constructor(index: number){
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
    constructor(index: number){
        super();
    }
};

class Sprite extends Component{
    spriteSheet: string;
    constructor(spriteSheet: string){
        super();
        this.spriteSheet = spriteSheet;
    }
};

class State extends Component{
    _state: string;
    stateMap: object;
    constructor(currentState: string, stateMap: object){
        super();
        this._state = currentState;
        this.stateMap = stateMap;
    }
    get state(){
        return this.stateMap[this._state];
    }
    set state(newState){
        if(this.stateMap[newState]){
            this._state = newState
        }
    }
};

class Tile extends Component{
    type: number | string;
    sheetType: string;
    constructor(type: string, sheetType: string){
        super();
        this.type = '';
        this.sheetType = '';
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
    constructor(){
        super();
        this.vertices = [];
    }

    createVertices(v: number[]){
        let vertices = [];
        if(v.length == 4) {//square  x,y,w,h
            vertices.push(new Vector2D(v[0], v[1]))
            vertices.push(new Vector2D(v[0] + v[2], v[1]))
            vertices.push(new Vector2D(v[0] + v[2], v[1] + v[3]))
            vertices.push(new Vector2D(v[0], v[1] + v[3]))
        } else if(v.length == 6){ //triangle
    
        } else { //polygon
    
        }
        this.vertices = vertices;
    }

    getCenterOfPoly(vertices: Vector2D[]){
        let center = new Vector2D(0,0);
        vertices.forEach(vertice => center.add(vertice));
        this.gameObject.getComponent('Position').pos =
        center.divide(vertices.length);
    }
};

class Physics extends Component{
    mass: number;
    velocity: Vector2D;
    friction: Vector2D;
    acceleration: Vector2D;
    constructor(){
        super();
        this.velocity = new Vector2D(0,0);
        this.friction = new Vector2D(.9,.9);
        this.acceleration = new Vector2D(0,0);
        this.mass = 1;
    };

    start(){
        if(!this.gameObject.getComponent('Position')){
            //must have a position 
        }
    };

    // update(dt){
    //     if(this.gameObject.getComponent('Position')){
    //         this.velocity.add(this.acceleration.multiply(dt/100));
    //         this.gameObject.getComponent('Position').pos.add(this.velocity);
    //         this.velocity.x *= this.friction.x;
    //         this.velocity.y *= this.friction.y;
    //         this.acceleration.set(0,0);
    //     }   
    // };
};

function Components(){
    const comp = {
        Solid,
        Renderable,
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
        Physics
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