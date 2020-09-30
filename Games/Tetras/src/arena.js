class Arena {
    constructor(h,w){
        this.area = {h: 0, w: 0};
        this.matrix = this.createArena(h,w);
        this.loc = {x:0, y:0};
    }
    createArena(h,w) {
        this.area = {h,w};
        const matrix = [];
        for(let i = 0; i < h; i++){
                matrix.push([...Array(w)].fill(0,0,w));
        }
        return matrix;
    }
    merge(matrix, offset) {
        const {x, y} = offset;
        for(let i = 0; i < this.matrix.length; i++){
            for(let j = 0; j < this.matrix[i].length; j++){
                if(i >= y && i - y < matrix.length){
                    if(j >= x && j - x < matrix[i - y].length)
                        if(matrix[i - y][j - x] !== 0){
                            this.matrix[i][j] = matrix[i - y][j - x];
                        }
                }
            }
        }
    }
    clearRows() {
        for(let i = this.matrix.length - 1; i > 0; i--){
            if(this.matrix[i].findIndex(n => n == 0) == -1){
                const row = this.matrix.splice(i, 1)[0].fill(0);
                this.matrix.unshift(row);
                i++;
            }
        }
    }
    clearAll() {
        for(let i = this.matrix.length - 1; i > 0; i--){
            for(let j = 0; j < this.matrix[i].length; j ++){
                this.matrix[i][j] = 0;
            }
        }
    }
}

export default Arena;