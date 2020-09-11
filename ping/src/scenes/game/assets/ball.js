"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Ball {
    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.xVelocity = v;
        this.yVelocity = v;
    }
    move() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    }
    collideAndReverse(x, y) {
        if (x > 0) {
            this.xVelocity = -this.xVelocity;
        }
        if (y > 0) {
            this.yVelocity = -this.yVelocity;
        }
    }
    resetBall(x, y) {
        this.y = y;
        this.x = x;
        this.xVelocity = (Math.floor(Math.random() * 3) + 1.5);
        this.yVelocity = (Math.floor(Math.random() * 3) + 1.5);
        console.log(this.xVelocity, this.yVelocity);
    }
}
exports.default = Ball;
//# sourceMappingURL=ball.js.map