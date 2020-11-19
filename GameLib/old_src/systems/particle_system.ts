import System_Base from './system_base';
import Store from '../core/store';
import Components from "../components/components";
import Event from '../core/event_system';
import Composer from '../modules/composer';

class Particle_System extends System_Base{
    pool: any;
    limit: number;
    total: number;
    constructor(){
        super();
        this.targetComponents = ['Particle'];
        this.pool = [],
        this.limit = 100;
        this.total = 0;
    }

    init(){
        Event.subscribe('create_particle', (data)=>this.create(data))
    }

    create(data){
        let {comp: components} = Components; 
        
        if(this.total < this.limit){
           // this.pool.push(data)
           let particle = [];
          
           particle.push(new components.Renderable());
           particle.push(new components.Position(data.pos.x, data.pos.y));
           particle.push(new components.Size(8, 8));
           particle.push(new components.Entity(data.sprite, "Tiled"));
           particle.push(new components.Sprite('colored_tilemap'));
           if(data.life){
                particle.push(new components.Particle(data.life));
           }else {
                particle.push(new components.Particle(100));
           }
           if(data.velocity){
                particle.push(new components.Physics(data.velocity));
           }

           this.pool.push(particle);
           this.total++;
        }
    }


    update({deltaTime, entities}){
       const {camera, scale} = Store.getStore('engine').access('camera', 'scale');
        
        if(this.pool.length > 0){
            entities.addGameObject(this.pool);
            this.pool = [];
        }
        
        entities.query(...this.targetComponents).forEach(e => {
           //console.log(e)
           let {lifeTime, currentLife} = e.getComponent('Particle');
            if(currentLife + deltaTime > lifeTime){
                entities.removeGameObject(e);
                this.total--;
            } 
            else {
                e.getComponent('Particle').currentLife += deltaTime;
            }
       })
    }
}

export default Particle_System;