declare class dataManager {
    store: any;
    constructor(data: object);
    update(data: object): void;
    getDataTools(): {
        update: any;
    };
}
export default dataManager;
