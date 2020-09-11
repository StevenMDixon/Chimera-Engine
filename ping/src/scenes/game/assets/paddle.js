"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Paddle {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.velocity = 0;
    }
    move(deltaTime) {
        this.x += this.velocity;
        if (this.velocity !== 0) {
            this.velocity += -this.velocity * deltaTime;
        }
    }
    updateVelocity(v) {
        if (this.velocity < 1 || this.velocity > -1) {
            this.velocity += v;
        }
    }
}
exports.default = Paddle;
//# sourceMappingURL=paddle.js.map