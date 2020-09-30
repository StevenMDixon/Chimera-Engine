class Ball {
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    constructor(x, y, v){
        this.x = x;
        this.y = y;
        this.xVelocity = v;
        this.yVelocity = v;
    }
    move(): void{
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
    collideAndReverse(x, y): void{
        if(x > 0){
            this.xVelocity = -this.xVelocity;
        }
        if(y > 0){
            this.yVelocity = -this.yVelocity
        }
    }
    resetBall(x, y): void{
        this.y = y;
        this.x = x;
        this.xVelocity = (Math.floor(Math.random() * 3) + 1.5) ;
        this.yVelocity = (Math.floor(Math.random() * 3) + 1.5) ;
        console.log(this.xVelocity, this.yVelocity)
    }
}

export default Ball;