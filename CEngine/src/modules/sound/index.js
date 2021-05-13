class SoundManager{
    constructor(){}
    
    pixiAudioControl(audio, command){
        const {action, name} = command;
        
        if(action == 'play'){
            audio[name].sound.play();
        }
        if(action == 'stop'){
            audio[name].sound.stop();
        }
    }
}

export default new SoundManager();