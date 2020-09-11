"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
class Menu extends entity_1.default {
    constructor({ x, y, optionsList, buttons, fontSize, vSpace, font }) {
        super(x, y, 0, 0);
        this.options = optionsList;
        this.currentOption = 0;
        this.mappedButtons = buttons;
        this.fontSize = fontSize || 10;
        this.vSpace = vSpace || 0;
        this.font = font || 'Arial';
    }
    draw(ctx) {
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.textAlign = "center";
        ctx.textBaseline = 'top';
        let maxWidth = 0;
        this.options.forEach(option => {
            if (ctx.measureText(option).width > maxWidth) {
                maxWidth = ctx.measureText(option).width;
            }
        });
        let cursorOffset = this.currentOption * this.fontSize + (this.currentOption > 0 ? this.vSpace : 0);
        ctx.beginPath();
        ctx.moveTo(this.x - maxWidth / 2 - 10, this.y + cursorOffset + 2);
        ctx.lineTo(this.x - maxWidth / 2 - 10, this.y + this.fontSize + cursorOffset - 2);
        ctx.lineTo(this.x + 5 - maxWidth / 2 - 10, this.y + this.fontSize / 2 + cursorOffset - 1);
        ctx.closePath();
        ctx.fill();
        this.options.forEach((option, index) => {
            let yOffset = index * this.fontSize + (index > 0 ? this.vSpace : 0);
            ctx.fillText(`${option}`, this.x, this.y + yOffset);
        });
    }
    moveCursor(direction) {
        let handled = false;
        if (direction == 'up') {
            if (this.currentOption - 1 > -1) {
                this.currentOption -= 1;
            }
            handled = true;
        }
        if (direction == 'down') {
            if (this.currentOption + 1 < this.options.length) {
                this.currentOption += 1;
            }
            handled = true;
        }
        return handled;
    }
    handleInput(keyCode) {
        let option = 'not handled';
        if (this.moveCursor(this.mappedButtons[keyCode])) {
            option = 'movement';
        }
        if (this.mappedButtons[keyCode] == 'accept') {
            option = this.options[this.currentOption];
        }
        return option;
    }
}
exports.default = Menu;
//# sourceMappingURL=menu.js.map