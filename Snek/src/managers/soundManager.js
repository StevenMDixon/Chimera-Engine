class soundManager {
    constructor(sounds){
        this.sounds = sounds;
        this.currentBG = null;
    }
    addSounds(soundFiles){
        this.sounds = {...this.sounds, ...soundFiles};
    }
    playEffect(name, volume){
        new Audio(this.sounds[name]).play();
    }
    playBG(name, volume){
        this.currentBG = new Audio(this.sounds[name]);
        this.currentBG.play();
    }
    stopBG(){
        this.currentBG.pause();
    }
}

export default soundManager;