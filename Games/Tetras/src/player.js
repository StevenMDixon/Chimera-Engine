import getPiece from './pieces';


class Player {
    constructor(h, w) {
        this.piece = getPiece();
        this.w = w;
        this.loc = {x: w/2, y: 0};
    }
    reset(){
        this.piece = getPiece();
        this.loc = {x: this.w/2, y:0};
    }
    rotate(dir){
        let rotated = this.piece.map(row => [...row]);
        for(let i = 0; i < this.piece.length; i++){
            for(let j = 0; j < this.piece[i].length; j++){
                rotated[i][j] = this.piece[j][i];
            }
        }
        if(dir < 0) {
            this.piece = rotated.map(row => row.reverse());
        }else{
            this.piece = rotated.reverse();
        }   
    }
    move(dir){
        this.loc.x += dir;
    }
}

export default Player;