class Scene {
    protected _store: object;
    protected _game: any;

    constructor({store, api}){
        this._store = store;
        this._game = api
    }

    get store() {
        return this._store;
    }

    get game() {
        return this._game;
    }

    public setup(){
        // this runs one time and first
    }
    
    public update(deltaTime: number): void{

    }

    public draw(deltaTime: number): void{
        
    }

}

export default Scene;