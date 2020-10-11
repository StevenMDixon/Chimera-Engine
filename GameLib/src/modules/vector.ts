
/*

vector - set of 2 numbers x and y

add = x1 + x2, y1 + y2
sub = x1 - x2, y1 - y2

mult = multiplies x y by passed factor
divide = divides x y by passed factor

mag = inverse of pythag A^2 + B^2 = C^2

normalize = uses pythag to set mag to 1   (1^2) = x^2 + y^2 , x = sqrt(1^2 - y^2)  y = qrt(1^2 - x^2)

limit - limits the magnitude

*/

import { Vector } from "..";

class Vector2D {
    x: number;
    y: number;

    constructor(x, y){
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    }

    set(vector: Vector2D){
        this.x = vector.x;
        this.y = vector.y;
        return this
    }

    add(vector: Vector2D){
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    subtract(vector: Vector2D){
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
}

export default Vector2D;