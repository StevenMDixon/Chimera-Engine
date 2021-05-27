import Chimera from 'ChimeraEngine';

//import * as particles from 'pixi-particles';

import MovementSystem from './movement_sys';
import StateSystem from './state_sys';
import PlayerCollides from './player_collides';
import HandlePlayerCollides from './player_handle_col';
import actors from './actors';
//import myParticles from './particles';

class Opening extends Chimera.sceneTemplates.PixiScene {
    constructor()    {
        super('Opening');
        this.player = null;
        this.p = null;
    }

    preload(){
       this.world.registerSystem(MovementSystem);
       this.world.registerSystem(StateSystem);
       this.world.registerSystem(PlayerCollides);
       this.world.registerSystem(HandlePlayerCollides);
       this.loadMap('map1');
       this.loadActors(actors);
    }

    setup(loader, resources){
        const {PIXI, global, world, stage} = this;
        const {player} = this.actors.list;

        const transform = player.components.get('Transform');

        transform.x = 0;
    //     let sheet = new PIXI.BaseTexture.from(resources["player"].url);
    //     let playerSheet = {};
    //     let h = 8;
    //     let w = 8;
    //     //this.loader.resources.bird.sound.loop = true;

    //     //this.event.publish('_controlSound', {action: 'play', name: 'bird'})
    //     //this.loader.resources.bird.sound.play();
    //     //resources.bird.sound.play();
    //     playerSheet.one = [
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(0, 0, w, h)),
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(w, 0, w, h))
    //     ];

    //     playerSheet.two = [
    //         new PIXI.Texture(sheet, new PIXI.Rectangle(w * 5, 0, w, h)),
    //         new PIXI.Texture(sheet, new  PIXI.Rectangle(w * 6, 0, w, h))
    //     ];

    //     this.createLayer('bg1', 0);
    //    // for(let i = 0; i < 1; i++){
    //         let player = new PIXI.AnimatedSprite(playerSheet.one);
    //         player.x = 100; //Math.random() * 200;
    //         player.y = 100; //Math.random() * 200;
    //         player.loop = true;
    //         player.anchor.set(0.5);
    //         player.animationSpeed = .5;
    //         player.rotation = 0;
    //         //player.play();
    //         player.scale.set(1, 1)
    //         //player.filters = [new this.PIXI.filters.BlurFilter()];
    //         //console.log(player.playing)
    //         //player.scale.set(4,4)
    //         world.composeEntity(
    //             [
    //             new Chimera.components.Player(),
    //             new Chimera.components.Pixi(player),
    //             new Chimera.components.PixiAnimations(playerSheet),
    //             new Chimera.components.Transform(player.x, player.y, player.rotation, 1, 1),
    //             new Chimera.components.Inputs(),
    //             new Chimera.components.State('idle'),
    //             new Chimera.components.Movable(),
    //         ])
            
            
    //         this.addToLayer('bg1', player);
    //     //}
    //     this.player = player;
    // //     // let p = new particles.Emitter(
    // //     //     this._layers['bg1'],
    // //     //     playerSheet.one,
    // //     //     myParticles[1]
    // //     // )
    // //     // p.emit = true;
    // //     // this.p = p
    // //     // document.addEventListener('keydown', (e)=> {
    // //     //     let t = this.player.getComponent('Transform')
    // //     //     console.log(t)
    // //     //     t.x += 20;
    // //     // }
    // //     // )
        

    // //     // setTimeout(()=>{
    // //     //     let {pixi} = this.player.components.get("Pixi");
    // //     //     let {PixiAnimations} = this.player.components.get("PixiAnimations")
    // //     //     //pixi.rotation = .5;
    // //     //     pixi.textures = PixiAnimations.two
    // //     // }, 1000)
    stage.position.set(600/2, 600/2);
    //     this._stage.pivot.set(this.player.x, this.player.y)
    }

    update(dt){
        // const {stage} = this.store.data;
        
        //this.event.publish('_updatedebug', {x: this.player.position.x, y: this.player.position.y})
        // if(this.p){
        //     //console.log(this.p)
        //     this.p.update(dt)
           
        // }
        // if(player){
        //     this.stage.pivot.set(player.x, player.y)
        //     //console.log(this.player.currentFrame, this.player.totalFrames)
        // }
    }
}

export default Opening;

