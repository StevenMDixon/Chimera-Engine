"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class dataManager {
    constructor(data) {
        this.store = data;
    }
    update(data) {
        this.store = Object.assign(Object.assign({}, this.store), data);
    }
}
exports.default = dataManager;
//# sourceMappingURL=dataManager.js.map