class soundManager {
    sounds: any;
    currentBG: any;

    constructor(sounds?: object){
        this.sounds = sounds;
        this.currentBG = null;
    }
    addSounds(soundFiles: object){
        this.sounds = {...this.sounds, ...soundFiles};
    }
    playEffect(name: string, volume: number){
        new Audio(this.sounds[name]).play();
    }
    playBG(name: string, volume: number){
        this.currentBG = new Audio(this.sounds[name]);
        this.currentBG.play();
    }
    stopBG(){
        this.currentBG.pause();
    }
}

export default soundManager;