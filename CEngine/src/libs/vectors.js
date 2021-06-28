class Vector {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    set(vector){
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }

    add(vector){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subtract(vector){
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    multiply(amount){
        this.x *= amount;
        this.y *= amount;
        return this;
    }

    divide(amount){
        this.x /= amount;
        this.y /= amount;
        return this;
    }

    magSq(){
        return this.x * this.x + this.y * this.y;
    }

    mag(){
        return Math.sqrt(this.magSq());
    }

    setMag(n){
        return this.normalize().multiply(n)
    }

    normalize(){
        // divide by magnitude
        let mag = this.mag();
        this.x /= mag;
        this.y /= mag;
        return this;
    }

    limit(){
        this.divide(Math.sqrt(this.magSq()));
        return this;
    }

    dot(v){
        return this.x * v.x + this.y * v.y;
    }

    linearInt(x, y, a){
        this.x += (x - this.x) * a || 0;
        this.y += (y - this.y) * a || 0;
        return this;
    }

    vLinearInt(v, a){
        this.x += (v.x - this.x) * a || 0;
        this.y += (v.y - this.y) * a || 0;
        return this;
    }

    perp(){
        let tmp = this.x;
        this.x = -this.y;
        this.y = tmp;
        return this;
    }


    scalarProject(vec){
        return this.dot(vec) / vec.mag();
    }

    scalarProjectUnit(vec) {
        return this.dot(vec);
    }

    negate(){
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    // @ todo define static methods
    static add(v1, v2){
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static multiply(v1, v2){
        return new Vector(v1.x * v2.x, v1.y * v2.y)
    }

    static subtract(v1, v2){
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }

    static divide(v1, amount){
        return new Vector(v1.x / amount, v1.y / amount);
    }

    static multiplybyInt(v, i){
        return new Vector(v.x * i, v.y * i)
    }
}

export default Vector;