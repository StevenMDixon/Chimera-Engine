class System_Base {
    constructor(){
        this.targetComponents = [];
        this.order = 1;
    }

    init(){}

    update({}, next){ next();}

}

export default System_Base;