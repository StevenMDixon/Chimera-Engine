interface ScreenData {
    ctx: any,
    canvas: any,
    scale: number,
    gotoScreen: () => void,
    //updateGameStore: () => void;
    data: any
}

class Screen {
    private _scale : number;
    private _ctx: any;
    private _canvas: any;
    private _data: object;
    private _gotoScreen: (target: string) => void;
    private _updateGameStore: (data: any) => void;
    
    constructor({ctx, canvas, scale, gotoScreen, data}: ScreenData){
        this._ctx = ctx;
        this._canvas = canvas;
        this._scale = scale;
        this._gotoScreen = gotoScreen;
        //this._updateGameStore = updateGameStore;
        this._data = data;
    }

    get scale(): number {
        return this._scale;
    }
    get ctx(): any {
        return this._ctx;
    }
    get canvas(): any {
        return this._canvas;
    }
    get data(): any {
        return this._data;
    }
    setup(){

    }
    updateGameData(data: object): void{
        this._data = {...this._data, ...data};
    }
    update(deltaTime: number, updateStore: object, soundController: object): void{

    }
    draw(deltaTime: number, images: object): void{
    }
    handleInput(event: object): void{
    }
    gotoNextScreen(target: string): void {
        this._gotoScreen(target);
    }
}

export default Screen;