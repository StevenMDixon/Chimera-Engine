import System_Base from './system_base';
import SpriteSheet from '../modules/spriteSheet';
import Store from '../modules/store';
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
        this.renderer = Renderer(ctx)('system');
    }

    update(deltaTime, enities){
        const [tiles, sprites] = partition(enities, (e) => e.hasComponent('Tile'));

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


                if(t.hasComponent('Player')){
                    //@TODO implement player logic?
               
                }
                
                const {sprite, imageName} = (ss.resolveSpriteData(anim, totalTime));
 
                const image = images[imageName];
                if(image && sprite){
                    
                    this.renderer.drawSprite(image, sprite,  pos.x - camera.offSets.x ,  pos.y - camera.offSets.y, size.x, size.y)
                    if(t.hasComponent("Player")){
                        let e1 = {};
                        let {pos} = t.getComponent("Position");
                        let vertices = createVerticesFromSize(pos, t.getComponent("Size").size)
                        e1['pos'] = getCenterOfPoly(vertices);
                        e1['vertices'] = vertices;
                        this.renderer.drawPolygon('red', false, true, camera.offSets.x ,  camera.offSets.y , vertices);
                    }

                }
            }else if(t.hasComponent('Size')){
                const {pos} = t.getComponent('Position');
                const {size} = t.getComponent('Size');
                this.renderer.drawRect(pos.x - camera.offSets.x ,  pos.y - camera.offSets.y , size.x, size.y, 'red', false, true)
            } else if (t.hasComponent('Polygon')){
                const {vertices} = t.getComponent('Polygon');
                this.renderer.drawPolygon('red', false, true, camera.offSets.x , camera.offSets.y , vertices);
            }
            
        })        
    }
}



export default Render_System;