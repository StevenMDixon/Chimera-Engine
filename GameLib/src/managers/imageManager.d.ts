declare class ImageManager {
    images: object;
    imageSrc: object;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    scale: number;
    debugger: boolean;
    constructor();
    setup(ctx: any, canvas: any, scale: number): void;
    addImages(images: object): void;
    loadImages(): Promise<boolean>;
    getRenderer(): object;
    drawTile(object: any): void;
    drawSprite(object: any, x?: number, y?: number): void;
    drawBG(bg: string, x: number, y: number): void;
    drawText(text: string, x: number, y: number, options?: any): void;
    debug(option: boolean): void;
    drawParticle(object: any): void;
}
export default ImageManager;
