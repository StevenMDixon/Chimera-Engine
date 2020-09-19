import DataManager from './dataManager';
import SoundManager from './soundManager';
import ImageManager from './imageManager';
import Controller from '../classes/controller';
import Screen from '../classes/screen';
interface isScreens {
    [key: string]: Screen;
}
declare class Game {
    scale: number;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    lastTime: number;
    screens: isScreens;
    currentScreen: string;
    dataManager: DataManager;
    soundManager: SoundManager;
    imageManager: ImageManager;
    controller: Controller;
    controllerEnabled: boolean;
    controllerMap: object;
    enableDebug: boolean;
    constructor();
    setup({ target, scale, startingScreen, size, useController, debug }: {
        target: any;
        scale: any;
        startingScreen: any;
        size: any;
        useController: any;
        debug: any;
    }): void;
    start(): Promise<object>;
    update(time?: number): void;
    draw(dt: any): void;
    handleInput(): void;
    addScreens(screens: any): void;
    setupScreens(screens: any): void;
    gotoScreen(target: string): void;
    addSounds(sounds: object): void;
    addData(data: object): void;
    addImages(images: object): void;
    useCustomControllerMap(map: any): void;
}
export default Game;
