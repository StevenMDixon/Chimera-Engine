interface MenuOptions {
    x: number;
    y: number;
    optionsList: string[];
    buttons: object;
    fontSize?: number;
    vSpace?: number;
    font?: string;
}
declare class Menu {
    options: string[];
    currentOption: number;
    mappedButtons: object;
    fontSize: number;
    vSpace: number;
    font: string;
    x: number;
    y: number;
    constructor({ x, y, optionsList, buttons, fontSize, vSpace, font }: MenuOptions);
    draw(ctx: any): void;
    moveCursor(direction: string): boolean;
    handleInput(keyCode: number): string;
}
export default Menu;
