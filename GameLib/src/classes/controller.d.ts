declare class Controller {
    interval: any;
    controllerOverride: object;
    constructor();
    listenForGamePad(fx: any): void;
    stopListenforGamePad(): void;
    pollGamepads(fx: any): number;
    overrideControllerMapping(mapping: object): void;
}
export default Controller;
