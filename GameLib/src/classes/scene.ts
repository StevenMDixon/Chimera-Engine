class Scene {
    protected _inputs: object;
    protected _store: object;
    protected _game: any;

    constructor({store, api}){
        this._store = store;
        this._inputs = {};
        this._game = api
    }

    get inputs() {
        return this._inputs;
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

    public _handleInput(inputs): void{
        this._inputs = inputs
    }
}

export default Scene;