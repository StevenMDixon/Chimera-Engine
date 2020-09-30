class dataManager {
    store: any;

    constructor(data: object){
        this.store = data
    }
    update(data: object) {
        this.store = {...this.store, ...data};
    }
    getDataTools(){
        return{
            update: this.update.bind(this)
        }
    }
}

export default dataManager;