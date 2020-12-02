
export class Component{
    constructor(){
        this.gameObject = null;
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

class CameraFocus extends Component{};

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


class Components{
    constructor(){
        this.comp =  {
            Player,
            Movable,
            Inputs,
            State,
            CameraFocus,
            Emitter,
            Particle
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