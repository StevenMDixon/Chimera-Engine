
export class Component{
    constructor(){
        this.parent = null;
    }
}

class Player extends Component{};

class Movable extends Component{};

class Inputs extends Component{
    constructor(){
        super();
        this.inputs = {};
    }
};

class Transform extends Component{
    constructor(x, y, r = 0, sx = 1, sy = 1){
        super();
        this.x = x;
        this.y = y;
        this.rotation = r,
        this.scale = {
            x: sx,
            y: sy
        }
    
    }
};

class CameraFocusAble extends Component{
    constructor(isPrimary = false){
        super();
        this.primary = isPrimary;
    }
};

class State extends Component{
    constructor(currentState){
        super();
        this.state = currentState;
    }
};

class Emitter extends Component{
    
}

class Particle extends Component{
    constructor(lifeTime){
        super();
        this.lifeTime = lifeTime;
        this.currentLife = 0;
    }
}

class Pixi extends Component{
    constructor(data){
        super();
        this.pixi = data
    }
}

class PixiAnimations extends Component{
    constructor(data){
        super();
        this.PixiAnimations = data
    }
}

class PixiStage extends Component{

}

class Components{
    constructor(){
        this.comp =  {
            Player,
            Movable,
            Inputs,
            State,
            CameraFocusAble,
            Emitter,
            Particle,
            Transform,
            Pixi,
            PixiAnimations
        }
    }

    get components(){
        return this.comp;
    }

    getComponents(){
        return this.comp;
    }

    addComponents(components){
        components.forEach(com =>{
            let temp = new com({});
            this.comp[temp.constructor.name] = com;
        })
    }
}


export default new Components()