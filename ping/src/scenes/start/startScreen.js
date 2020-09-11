"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../lib/index");
class StartScreen extends index_1.Screen {
    constructor(gameProps) {
        super(gameProps);
    }
    draw() {
        this.ctx.fillStyle = "White";
        this.ctx.textAlign = "center";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Ping", this.canvas.clientWidth / this.scale / 2, this.canvas.height / this.scale / 2);
        this.ctx.fillText("Press Any button to start!", this.canvas.clientWidth / this.scale / 2, this.canvas.height / this.scale / 2 + 30);
    }
    handleInput(event) {
        if (event.keyCode > 0) {
            this.gotoNextScreen('GameScreen');
        }
    }
}
exports.default = StartScreen;
//# sourceMappingURL=startScreen.js.map