class dataManager {
    constructor(data){
        this.store = data
    }
    update(data) {
        this.store = {...this.store, ...data};
    }

}

export default dataManager;