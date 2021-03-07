import Chimera from 'ChimeraEngine';


import MovementSystem from '../movement_sys';
import StateSystem from '../state_sys';


class Opening extends Chimera.sceneTemplates.PixiScene {
    constructor(EngineItems)    {
        super('Opening', EngineItems);
        this.player = null;
    }

    preload(){
        this.loader.add('bird', './main.wav');
        //this.loader.add("song", "images/animationphases.png");
        this.world.registerSystem(MovementSystem);
        this.world.registerSystem(StateSystem);
        this.loadMap('map1');
    }

    setup(loader, resources){
        let sheet = new this.PIXI.BaseTexture.from(this.global.Loader.shared.resources["player"].url);
        let playerSheet = {}
        let h = 8;
        let w = 8;
        //this.loader.resources.bird.sound.loop = true;

        //this.event.publish('_controlSound', {action: 'play', name: 'bird'})
        //this.loader.resources.bird.sound.play();
        //resources.bird.sound.play();
        playerSheet.one = [
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(0, 0, w, h)),
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(w, 0, w, h))
        ];

        playerSheet.two = [
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(w * 5, 0, w, h)),
            new this.PIXI.Texture(sheet, new this.PIXI.Rectangle(w * 6, 0, w, h))
        ];

        for(let i = 0; i < 1; i++){
            let player = new this.PIXI.AnimatedSprite(playerSheet.one);
            player.x = 100; //Math.random() * 200;
            player.y = 100; //Math.random() * 200;
            player.loop = false;
            player.anchor.set(0.5);
            player.animationSpeed = .1;
            player.rotation = 0;
            player.play();
            player.scale.set(1, 1)

            //console.log(player.playing)
            //player.scale.set(4,4)
           this.world.composeEntity(
                [
                new Chimera.components.Player(),
                new Chimera.components.Pixi(player),
                new Chimera.components.PixiAnimations(playerSheet),
                new Chimera.components.Transform(player.x, player.y, player.rotation, 1, 1),
                new Chimera.components.Inputs(),
                new Chimera.components.State('idle')
            ])
            
            this.createLayer('bg1', 0);
            this.addToLayer('bg1', player)
        }
 
       

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

