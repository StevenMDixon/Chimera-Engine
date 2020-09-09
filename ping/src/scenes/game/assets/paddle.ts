class Paddle {
    x: number;
    y: number;
    w: number;
    h: number;
    velocity: number;

    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity = 0;
    }
    move(deltaTime: number): void {
        this.x += this.velocity;
        if(this.velocity !== 0){
            this.velocity += -this.velocity*deltaTime
        }
    }
    updateVelocity(v: number){
        if(this.velocity < 1 || this.velocity > -1){
        this.velocity += v;
        }
    }
}



export default Paddle;