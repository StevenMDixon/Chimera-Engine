import system_base from './system_base';

class soundHandler extends system_base {
    currentBG: any;

    constructor(store){
        super(store)
        this.currentBG = null;
    }
    playEffect(name: string, volume?: number): void{
        const sounds = this.store.access('sounds');
        let audio = new Audio(sounds[name])
        if(volume){
            audio.volume = volume;
        }
        audio.play();
    }
    playBG(name: string, volume?: number): void{
        const sounds = this.store.access('sounds');

        if(!this.currentBG){
            this.currentBG = new Audio(sounds[name]);
            if(volume){
                this.currentBG.volume = volume;
            }
            this.currentBG.play();

            this.currentBG.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false);
        }
        
    }
    stopBG(){
        this.currentBG.pause();
        this.currentBG.currentTime = 0;
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

export default soundHandler;