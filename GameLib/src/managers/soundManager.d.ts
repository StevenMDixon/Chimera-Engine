declare class soundManager {
    sounds: any;
    currentBG: any;
    constructor(sounds?: object);
    addSounds(soundFiles: object): void;
    playEffect(name: string, volume?: number): void;
    playBG(name: string, volume?: number): void;
    stopBG(): void;
    setBGVolume(volume: number): void;
    getAudioTools(): {
        playEffect: any;
        playBG: any;
        stopBG: any;
        setBGVolume: any;
    };
}
export default soundManager;
