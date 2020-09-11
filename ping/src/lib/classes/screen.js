"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Screen {
    constructor({ ctx, canvas, scale, gotoScreen, data }) {
        this._ctx = ctx;
        this._canvas = canvas;
        this._scale = scale;
        this._gotoScreen = gotoScreen;
        //this._updateGameStore = updateGameStore;
        this._data = data;
    }
    get scale() {
        return this._scale;
    }
    get ctx() {
        return this._ctx;
    }
    get canvas() {
        return this._canvas;
    }
    get data() {
        return this._data;
    }
    updateGameData(data) {
        this._data = Object.assign(Object.assign({}, this._data), data);
    }
    update(deltaTime, updateStore, soundController) {
    }
    draw(deltaTime) {
    }
    handleInput(event) {
    }
    gotoNextScreen(target) {
        this._gotoScreen(target);
    }
}
exports.default = Screen;
//# sourceMappingURL=screen.js.map