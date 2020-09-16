class soundManager {
    sounds: any;
    currentBG: any;

    constructor(sounds?: object){
        this.sounds = sounds;
        this.currentBG = null;
    }
    addSounds(soundFiles: object): void{
        this.sounds = {...this.sounds, ...soundFiles};
    }
    playEffect(name: string, volume?: number): void{
        let audio = new Audio(this.sounds[name])
        if(volume){
            audio.volume = volume;
        }
        audio.play();
    }
    playBG(name: string, volume?: number): void{
        
        this.currentBG = new Audio(this.sounds[name]);
        if(volume){
            this.currentBG.volume = volume;
        }
        this.currentBG.play();
    }
    stopBG(){
        this.currentBG.pause();
    }
    setBGVolume(volume: number){
        this.currentBG.volume = volume;
    }

    getAudioTools(){
        return {
            playEffect: this.playEffect.bind(this),
            playBG: this.playBG.bind(this),
            stopBG: this.stopBG.bind(this),
            setBGVolume: this.setBGVolume.bind(this)
        }
    }
}

export default soundManager;