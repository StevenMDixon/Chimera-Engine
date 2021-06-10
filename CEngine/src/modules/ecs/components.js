import Vector from '../../libs/vectors';

export class Component{
    constructor(){
        this.parent = null;
    }
}

class Player extends Component{};

class Movable extends Component{};

class Inputs extends Component{
    constructor(enabled){
        super();
        this.inputs = {};
        this.enabled = enabled;
    }
};

class Transform extends Component{
    constructor(pos, r = 0, scale){
        super();
        this.pos = pos;
        this.rotation = r,
        this.scale = scale;
    }
};

class CameraFocusable extends Component{
    constructor(isPrimary = false){
        super();
        this.primary = isPrimary;
    }
};

class State extends Component{
    constructor(currentState){
        super();
        this.previousState = currentState;
        this.currentState = currentState;
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
        this.animations = data
    }
}

class PixiStaticAnimations extends Component{
    constructor(data){
        super();
        this.animations = data
    }
}

class Commands extends Component{
    constructor(){
        super();
        this.commandList = [];
    }
}

class System_bounding_box extends Component{
    constructor(vertices){
        super()
        this.vertices = vertices;
    }
}

class Physics extends Component{
    constructor(vel, mass, gravity){
        super();
        this.velocity = new Vector(vel.x, vel.y);
        this.mass = mass || 0;
        this.gravity = gravity || 0;
        this.acceleration = new Vector(0,0);
        this.friction = new Vector(0,0);
    }
}

class System_solid extends Component{}

class Components{
    constructor(){
        this.comp =  {
            Player,
            Movable,
            Inputs,
            State,
            CameraFocusable,
            Emitter,
            Particle,
            Transform,
            Pixi,
            PixiAnimations,
            PixiStaticAnimations,
            Movable,
            Commands,
            Physics,
            System_bounding_box,
            System_solid
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