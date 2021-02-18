import Chimera from 'ChimeraEngine';

console.log(Chimera)
class Opening extends Chimera.sceneTemplates.PixiScene {
    constructor(EngineItems){
        super('Opening', EngineItems);
        this.ssheets = {};
    }

    preload(){
        console.log('Global', this.GlobalLoader.shared)
        //this.loader.add("player", "images/animationphases.png");
    }

    setup(){
        let sheet = new this.PIXI.BaseTexture.from(this.GlobalLoader.shared.resources["player"].url);
        this.ssheets.player = {}
        let h = 259;
        let w = 130;

        this.ssheets.player.one = [
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(0 + 10, 0, w, h)),
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(w + 10 + 30, 0, w, h))
        ];


        let player = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        player.x = 200;
        player.y = 200;
        player.loop = true;
        player.anchor.set(0.5);
        player.animationSpeed = .1;
        player.tint = 0x1FFFFF;
        this.layers.bg1.addChild(player);
        player.play();

        //setTimeout(()=> {player.stop()}, 1000)


        //let player2 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        // player2.x = 200;
        // player2.y = 200;

        // this.layers.bg2.addChild(player2);

        // let player3 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        // player3.x = 100;
        // player3.y = 100;

        // this.layers.effect.addChild(player3);


        // let player4 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        // player4.x = 0;
        // player4.y = 0;

        // this.createLayer('Test', 1, player4);
    }
}

export default Opening;