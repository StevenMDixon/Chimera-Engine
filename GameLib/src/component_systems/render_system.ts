import System_Base from './system_base';
import SpriteSheet from '../modules/spriteSheet';
import Store from '../core/store';
import Renderer from '../modules/renderer';
import {partition, getCenterOfPoly, createVerticesFromSize} from '../modules/utils';

class Render_System extends System_Base{
    private spriteSheets: any;
    private renderer: any;

    constructor(){
        super();
        this.order = 99;
        this.targetComponents = ['Position', 'Renderable'];
        this.spriteSheets = SpriteSheet;
        this.renderer = null
    }

    init(){
        const {sheets, imageRoot} = Store.getStore('asset').access('sheets', 'imageRoot');
        const {ctx} = Store.getStore('engine').access('ctx')
        this.spriteSheets.create(sheets, imageRoot);
        this.renderer = Renderer(ctx)();
    }

    update({deltaTime, entities}){
        //@Todo filter out every tile not inside of the cameras view so it is not rendered.

        const [tiles, sprites] = partition(entities.query(...this.targetComponents), (e) => e.hasComponent('Tile'));

        const {camera, totalTime} = Store.getStore('engine').access('camera', 'totalTime');
        const {images} = Store.getStore('asset').access('images');


        tiles.forEach(t => {
            const {pos} = t.getComponent('Position');
            const {spriteSheetName} = t.getComponent('Sprite')
            const {size} = t.getComponent('Size');
            const {tileType} = t.getComponent('Tile');
            const ss = this.spriteSheets.resolve(spriteSheetName)
            const {tile, imageName} = (ss.resolveTileData(tileType, totalTime));
            const image = images[imageName];
            if(image && tile){
                this.renderer.drawTile(image, tile,  pos.x - camera.offSets.x ,  pos.y - camera.offSets.y, size.x, size.y)
            }
        })

        sprites.forEach(t => {
            if(t.hasComponent('Sprite'))  {
                const {pos} = t.getComponent('Position');
                const {spriteSheetName} = t.getComponent('Sprite')
                const {size} = t.getComponent('Size');
                const {entityType} = t.getComponent('Entity');
                
                const ss = this.spriteSheets.resolve(spriteSheetName);

                

                let anim = parseInt(entityType);

                if(t.hasComponent('Animate', 'State')){
                    const {map} = t.getComponent('Animate');
                    const {state} = t.getComponent('State');
                    anim = map[state];
                }
                
                const {sprite, imageName} = (ss.resolveSpriteData(anim, totalTime));
 
                const image = images[imageName];
                if(image && sprite){
                    
                    this.renderer.drawSprite(image, sprite,  pos.x - camera.offSets.x ,  pos.y - camera.offSets.y, size.x, size.y)
                    
                    if(t.hasComponent("Solid") && Store.getStore('engine').access('debug').debug){
                        let vertices = createVerticesFromSize(pos, t.getComponent("Size").size);
                        this.renderer.drawPolygon('red', false, true, camera.offSets.x ,  camera.offSets.y , vertices);
                    }
                    
                }
            }else if(t.hasComponent('Size') && Store.getStore('engine').access('debug').debug){
                const {pos} = t.getComponent('Position');
                const {size} = t.getComponent('Size');
                this.renderer.drawRect(pos.x - camera.offSets.x ,  pos.y - camera.offSets.y , size.x, size.y, 'red', false, true);
            } else if (t.hasComponent('Polygon') && Store.getStore('engine').access('debug').debug){
                const {vertices} = t.getComponent('Polygon');
                this.renderer.drawPolygon('red', false, true, camera.offSets.x , camera.offSets.y , vertices);
            }
            
        })        
    }
}



export default Render_System;