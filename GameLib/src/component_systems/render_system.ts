import System_Base from './system_base';
import SpriteSheet from '../modules/spriteSheet';
import Store from '../modules/store';

class Render_System extends System_Base{
    private spriteSheets: any;


    constructor(){
        super();
        this.order = 99;
        this.targetComponents = ['Position', 'Renderable'];
        this.spriteSheets = SpriteSheet;
    }

    init(){
        const {sheets, imageRoot} = Store.getStore('asset').access('sheets', 'imageRoot');
        this.spriteSheets.create(sheets, imageRoot);
    }

    update(deltaTime, enities){
        const [animated, nonAnimated] = partition(enities, (e) => e.hasComponent('Animate'));

        animated.forEach(ae => {

        })

        nonAnimated.forEach(ae => {
            
        })

        //console.log(non)
        //@Todo it works now just have to figure out how to use it
        //console.log(enities)
        
    }
}

function partition(array, isValid) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
  }

export default Render_System;