import getPiece from './pieces';


function player() {
    return ({
        loc: {x: 1, y:1},
        piece: getPiece(),


        reset: function(){

        },
        rotate: function(){
            let rotated = this.piece.map(row => [...row]);
            for(let i = 0; i < this.piece.length; i++){
                for(let j = 0; j < this.piece[i].length; j++){
                  rotated[i][j] = this.piece[j][i];
                }
            }
            this.piece = rotated;
        },
        move: function(){

        }

    }) 
}

export default player;