interface ScreenData {
    ctx: any,
    canvas: any,
    scale: number,
    gotoScreen: () => void,
    data: any
}

class Screen {
    scale : number;
    ctx: any;
    canvas: any;
    data: object;
    gotoScreen: (target: string) => void;
    updateGameStore: (data: any) => void;
    
    constructor({ctx, canvas, scale, gotoScreen, data}: ScreenData){
        this.ctx = ctx;
        this.canvas = canvas;
        this.scale = scale;
        this.gotoScreen = gotoScreen;
        //this._updateGameStore = updateGameStore;
        this.data = data;
    }

    // get scale(): number {
    //     return this._scale;
    // }
    // get ctx(): any {
    //     return this._ctx;
    // }
    // get canvas(): any {
    //     return this._canvas;
    // }
    // get data(): any {
    //     return this._data;
    // }
    setup(){

    }
    updateGameData(data: object): void{
        this.data = {...this.data, ...data};
    }
    update(deltaTime: number, updateStore: object, soundController: object): void{

    }
    draw(deltaTime: number, images: object): void{
    }
    handleInput(event: object): void{
    }
    gotoNextScreen(target: string): void {
        this.gotoScreen(target);
    }
}

export default Screen;