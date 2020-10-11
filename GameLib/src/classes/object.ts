// import Vector2D from '../modules/vector';


// export class Entity {

//     pos: Vector2D;
//     size: Vector2D;
//     velocity: Vector2D;
//     friction: Vector2D;
//     acceleration: Vector2D;
//     traits: any;
//     spriteSheet: string;
//     state: string;
//     stateMap: object;
//     mass: number;


//     constructor(x,y, w, h){
//         this.pos = new Vector2D(x,y);
//         this.size = new Vector2D(w,h);
//         this.velocity = new Vector2D(0,0);
//         this.friction = new Vector2D(.5,.5);
//         this.acceleration = new Vector2D(0,0);
//         this.state = '';
//         this.spriteSheet = '';
//         this.mass = 1;
//         // @todo create traits
//         this.traits = new Set();
//         this.stateMap = {}
//     }

//     get _state(){
//         return this.stateMap[this.state]
//     }

//     move(dt){
//         this.velocity.add(this.acceleration.multiply(dt/100));
//         this.pos.add(this.velocity);
//         this.velocity.x = (this.velocity.x * this.friction.x);
//         this.velocity.y = (this.velocity.y * this.friction.y);

//         if(this.velocity.x > -0.01 && this.velocity.x < 0.01){
//             this.velocity.x = 0;
//         }

//         if(this.velocity.y > -0.09 && this.velocity.y < 0.09){
//             this.velocity.y = 0;
//         }

//        // this.acceleration.set(0,0);
//     }

//     getCameraData(){
//         return {x: this.pos.x, y: this.pos.y, w: this.size.x, h: this.size.y}
//     }

//     getRenderData(){
//         return {
//             spriteSheet: this.spriteSheet,
//             x: this.pos.x,
//             y: this.pos.y,
//             w: this.size.x,
//             h: this.size.y,
//             state: this.stateMap[this.state]
//         }
//     }

//     addTrait(traitName){
//         this.traits.add(traitName);
//     }
// }



