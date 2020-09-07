class soundManager {
    constructor(sounds){
        this.sounds = sounds;
    }
    addSounds(soundFiles){
        this.sounds = {...this.sounds, ...soundfiles}
    }
    playSound(name){
        new Audio(this.sounds[name]).play()
    }
}

export default soundManager;