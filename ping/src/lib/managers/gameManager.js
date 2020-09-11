"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataManager_1 = require("./dataManager");
const soundManager_1 = require("./soundManager");
class Game {
    constructor() {
        this.scale = 1;
        this.ctx = null;
        this.canvas = null;
        this.lastTime = 0;
        this.screens = {};
        this.currentScreen = '';
        this.dataManager = new dataManager_1.default({});
        ;
        this.soundManager = new soundManager_1.default();
    }
    setup(target, scale, startingScreen) {
        this.canvas = document.getElementById(target);
        this.ctx = this.canvas.getContext('2d');
        this.scale = scale;
        this.ctx.scale(scale, scale);
        this.currentScreen = startingScreen;
    }
    start() {
        this.handleInput();
        this.update();
    }
    update(time = 0) {
        const dt = time - this.lastTime;
        this.lastTime = time;
        this.screens[this.currentScreen].updateGameData(this.dataManager.store);
        this.screens[this.currentScreen].update(dt, this.dataManager.update.bind(this.dataManager), this.soundManager.playEffect.bind(this.soundManager));
        this.draw(dt);
        requestAnimationFrame((time) => this.update(time));
    }
    draw(dt) {
        //draw background
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.height);
        // draw current scene
        this.screens[this.currentScreen].draw(dt);
    }
    handleInput() {
        // this.InputHandler.startListening().then(e => console.log(e))
        document.addEventListener('keydown', event => { this.screens[this.currentScreen].handleInput(event); });
    }
    addScreens(screens) {
        this.setupScreens(screens);
    }
    setupScreens(screens) {
        for (let screen in screens) {
            this.screens[screen] = new screens[screen]({
                ctx: this.ctx,
                canvas: this.canvas,
                scale: this.scale,
                gotoScreen: this.gotoScreen.bind(this),
                data: this.dataManager.store
            });
        }
    }
    gotoScreen(target) {
        this.currentScreen = target;
    }
    loadSounds(sounds) {
        this.soundManager.addSounds(sounds);
    }
    loadData(data) {
        this.dataManager.update(data);
    }
}
exports.default = Game;
//# sourceMappingURL=gameManager.js.map