class System_Base {
    targetComponents: string[];
    order: number;
    constructor(){
        this.targetComponents = [];
        this.order = 1;
    }

    init(){}

    update(deltaTime, enities){}
}

export default System_Base;