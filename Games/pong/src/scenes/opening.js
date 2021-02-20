import Chimera from 'ChimeraEngine';

class Opening extends Chimera.sceneTemplates.PixiScene {
    constructor(EngineItems){
        super('Opening', EngineItems);
        this.ssheets = {};
        this.player = null;
    }

    preload(){
        console.log('Global', this.global)
        //this.loader.add("player", "images/animationphases.png");
    }

    setup(loader, resources){
        let sheet = new this.PIXI.BaseTexture.from(this.global.Loader.shared.resources["player"].url);
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
        player.animationSpeed = .001;
        player.tint = 0x1FFFFF;
        this.layers.bg1.addChild(player);
        //player.play();
        this.player = player;
        //setTimeout(()=> {player.stop()}, 1000)
        // player.onComplete = function () {
        //     console.log('completed')
        //   };



        let player2 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        player2.x = 200;
        player2.y = 200;

        this.layers.bg2.addChild(player2);

        let player3 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        player3.x = 100;
        player3.y = 100;

        this.layers.effect.addChild(player3);


        let player4 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
        player4.x = 0;
        player4.y = 0;

        this.createLayer('Test', 1, player4);
    }

    update(dt){
        //this.layers.bg1.rotation += .01;
        this.player.update(dt);
    }
}

export default Opening;