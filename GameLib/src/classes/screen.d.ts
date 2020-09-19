interface ScreenData {
    ctx: any;
    canvas: any;
    scale: number;
    gotoScreen: () => void;
    data: any;
}
declare class Screen {
    private _scale;
    private _ctx;
    private _canvas;
    private _data;
    private _gotoScreen;
    private _updateGameStore;
    constructor({ ctx, canvas, scale, gotoScreen, data }: ScreenData);
    get scale(): number;
    get ctx(): any;
    get canvas(): any;
    get data(): any;
    setup(): void;
    updateGameData(data: object): void;
    update(deltaTime: number, updateStore: object, soundController: object): void;
    draw(deltaTime: number, images: object): void;
    handleInput(event: object): void;
    gotoNextScreen(target: string): void;
}
export default Screen;
