import Vector2D from '../modules/vector';


export class Entity {

    pos: Vector2D;
    size: Vector2D;
    velocity: Vector2D;
    friction: Vector2D;
    acceleration: Vector2D;
    traits: any;
    spriteSheet: string;
    state: string;
    stateMap: object;
    mass: number;


    constructor(x,y, w, h){
        this.pos = new Vector2D(x,y);
        this.size = new Vector2D(w,h);
        this.velocity = new Vector2D(0,0);
        this.friction = new Vector2D(.9,.9);
        this.acceleration = new Vector2D(0,0);
        this.state = '';
        this.spriteSheet = '';
        this.mass = 1;
        // @todo create traits
        this.traits = new Set();
        this.stateMap = {}
    }

    get _state(){
        return this.stateMap[this.state]
    }

    move(dt){
        this.velocity.add(this.acceleration.multiply(dt/100));
        this.pos.add(this.velocity);
        this.velocity.x *= this.friction.x;
        this.velocity.y *= this.friction.y;
        this.acceleration.set(0,0);
    }

    getCameraData(){
        return {x: this.pos.x, y: this.pos.y, w: this.size.x, h: this.size.y}
    }

    getRenderData(){
        return {
            spriteSheet: this.spriteSheet,
            x: this.pos.x,
            y: this.pos.y,
            w: this.size.x,
            h: this.size.y,
            state: this.stateMap[this.state]
        }
    }

    addTrait(traitName){
        this.traits.add(traitName);
    }
}


export class Polygon extends Entity {
    vertices: Vector2D[];
    center: Vector2D;

    constructor(...points){
        super(0,0,0, 0);
        this.vertices = createVertices(points);
        this.pos = getCenterOfPoly(this.vertices)
    }

    getCameraData(){
        return {x: this.pos.x, y: this.pos.y, w: this.size.x, h: this.size.y}
    }
}


function getCenterOfPoly(vertices: Vector2D[]){
    let center = new Vector2D(0,0);
    vertices.forEach(vertice => center.add(vertice));
    return center.divide(vertices.length);
}


function createVertices(v: number[]){
    let vertices = [];
    if(v.length == 4) {//square  x,y,w,h
        vertices.push(new Vector2D(v[0], v[1]))
        vertices.push(new Vector2D(v[0] + v[2], v[1]))
        vertices.push(new Vector2D(v[0] + v[2], v[1] + v[3]))
        vertices.push(new Vector2D(v[0], v[1] + v[3]))
    } else if(v.length == 6){ //triangle

    } else { //polygon

    }
    return vertices;

}