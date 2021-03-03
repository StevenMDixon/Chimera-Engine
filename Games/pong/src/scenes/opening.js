import Chimera from 'ChimeraEngine';
import * as filters from 'pixi-filters';
import MovementSystem from '../movement_sys';
// console.log(Chimera.components)

class Opening extends Chimera.sceneTemplates.PixiScene {
    constructor(EngineItems)    {
        super('Opening', EngineItems);
        this.player = null;
    }

    preload(){
        //console.log('Global', this.global)
        //this.loader.add("player", "images/animationphases.png");
        this.world.registerSystem(MovementSystem)
    }

    setup(loader, resources){
        let sheet = new this.PIXI.BaseTexture.from(this.global.Loader.shared.resources["player"].url);
        let playerSheet = {}
        let h = 8;
        let w = 8;

        playerSheet.one = [
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(0, 0, w, h)),
            //new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(w + 10 + 30, 0, w, h))
        ];

        playerSheet.two = [
            
        ];

        for(let i = 0; i < 1; i++){
            let player = new this.PIXI.AnimatedSprite(playerSheet.one);
            player.x = 100 //Math.random() * 200;
            player.y = 100 //Math.random() * 200;
            player.loop = false;
            player.anchor.set(0.5);
            player.animationSpeed = .1;
            player.rotation = 0;
            //player.scale.set(4,4)
           this.world.composeEntity(
                [
                new Chimera.components.Player(),
                new Chimera.components.Pixi(player),
                new Chimera.components.PixiAnimations(playerSheet),
                new Chimera.components.Transform(player.x, player.y, player.rotation, 4, 4),
                new Chimera.components.Inputs()
            ])
            
            this.layers.bg1.addChild(player);
        }
 
       
        //player.tint = 0x1FFFFF;
        // console.log(this.PIXI.filters)
        // console.log(filters)
        this._stage.filters = [new this.PIXI.filters.AlphaFilter(.5)]

        
        //player.play();
        //this.player = player;
        //setTimeout(()=> {player.stop()}, 1000)
        // player.onComplete = function () {
        //     console.log('completed')
        //   };
       // this.world.


        // let player2 = new this.PIXI.AnimatedSprite(this.ssheets.player.one);
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

        // document.addEventListener('keydown', (e)=> {
        //     let t = this.player.getComponent('Transform')
        //     console.log(t)
        //     t.x += 20;
        // }
        // )

        

        // setTimeout(()=>{
        //     let {pixi} = this.player.components.get("Pixi");
        //     let {PixiAnimations} = this.player.components.get("PixiAnimations")
        //     //pixi.rotation = .5;
        //     pixi.textures = PixiAnimations.two
        // }, 1000)

    }

    update(dt){
       
    }
}

export default Opening;

