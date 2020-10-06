// import Particles from './particle';
// import Entity from './entity';

// class Emitter {
//     particles: Particles[];
//     x: number;
//     y: number;
//     h: number;
//     w: number;
//     particleLimit: number;
//     maxLife: number;
//     sprite: string
//     shape: string
//     options: {
//         [key: string]: any
//     }
//     movement: any;
//     attachment: Entity;
//     generate: (i: any) => {};
//     kill: (Particle) => {};

//     constructor(x: number, y: number, w: number, h: number, limit: number, options: object, generate?, kill?){
//        this.particles = [];
//        this.x = x;
//        this.y = y;
//        this.h = h;
//        this.w = w;
//        this.particleLimit = limit;
//        this.options = {
//             maxLife: 0,
//             spriteSheet: '',
//             shape: 'square',
//             color: 'red',
//             w: 1,
//             h: 1,
//             rad: 0,
//             xVel: 1,
//             yVel: 0,
//             rotation: 0,
//             gravity: false,
//             movement : {
//                 x: (x, v) => x + v,
//                 y: (y, v) => y + v
//             },
//             map: {
//                 x: (x, w) => x,
//                 y: (y, h) => y
//             },
//             ...options
//        }
//        this.attachment = null;
//        this.generate = generate ? generate: (Particle) => true;
//        this.kill = kill ? kill : (Particle) => false;
//     }

//     update(dt){
//         if(this.attachment){
//             this.x = this.attachment.x;
//             this.y = this.attachment.y;
//         }
 

//         for(let p = 0; p < this.particles.length; p++){
//         let options = this.options;

//            this.particles[p].update(
//                options.movement.x(this.particles[p].x, options.xVel) ,
//                options.movement.y(this.particles[p].y, options.yVel) 
//            );
//             if(this.particles[p].lifeState == 0 || this.kill(this.particles[p])){
//                 this.particles[p].reset(
//                     Math.floor((Math.random() * this.w) + this.x),
//                    Math.floor((Math.random() * this.h)+ this.y)
//                 )
//             }

//         }

//         if(this.particleLimit - this.particles.length > 0 && this.generate(this)){
//             if(this.attachment){
//                 this.particles.push(
//                     new Particles(
//                        Math.floor((Math.random() * this.w) + this.x),
//                        Math.floor((Math.random() * this.h)+ this.y),
//                        this.options.w,
//                        this.options.h,
//                        this.options.maxLife,
//                        this.options.rotation,
//                        this.options.color,
//                        this.options.opacity,
//                        this.options.spriteSheet,
//                        this.attachment.state
//                     ));
//             }else {
//                 this.particles.push(
//                     new Particles(
//                        Math.floor((Math.random() * this.w) + this.x),
//                        Math.floor((Math.random() * this.h)+ this.y),
//                        this.options.w,
//                        this.options.h,
//                        this.options.maxLife,
//                        this.options.rotation,
//                        this.options.color,
//                        this.options.opacity,
//                     ));
//             }

            
//         } 
//     }



//     getParticles(): Particles[] {
//         return [...this.particles];
//     }

//     attach(entity){
//         this.attachment = entity
//     }


// }

// export default Emitter;