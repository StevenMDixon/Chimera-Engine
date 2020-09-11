"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class soundManager {
    constructor(sounds) {
        this.sounds = sounds;
        this.currentBG = null;
    }
    addSounds(soundFiles) {
        this.sounds = Object.assign(Object.assign({}, this.sounds), soundFiles);
    }
    playEffect(name, volume) {
        let audio = new Audio(this.sounds[name]);
        if (volume) {
            audio.volume = volume;
        }
        audio.play();
    }
    playBG(name, volume) {
        this.currentBG = new Audio(this.sounds[name]);
        this.currentBG.play();
    }
    stopBG() {
        this.currentBG.pause();
    }
}
exports.default = soundManager;
//# sourceMappingURL=soundManager.js.map