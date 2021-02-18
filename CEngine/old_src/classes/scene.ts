class Scene {
    protected _store: object;
    protected _game: any;

    constructor(api){
    
        this._game = api
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

    public input_event(inputs){
        
    } 

}

export default Scene;