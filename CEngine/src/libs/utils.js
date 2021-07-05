import Vector from './vectors';

export function getCenterOfPoly(vertices){
    return vertices.reduce((acc, cur)=>{
        acc.add(cur);
        return acc;
    }, new Vector(0,0)).divide(vertices.length);
}

export function createVertices(arrofV){
    return arrofV.map(vertice => {
            return new Vector(vertice.x, vertice.y);
    })
}

export function createVerticesFromSize(x,y,w,h){
    return [
        new Vector(x, y),
        new Vector(x + w, y),
        new Vector(x + w, y + h),
        new Vector(x, y + h)
    ];
}

export function calculateResolutionVector(collisionData){
    return Vector.multiply(collisionData.MTVAxis, new Vector(collisionData.smallestOverlap, collisionData.smallestOverlap));
}


export function partition(array, isValid) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
}

export function clamp (num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export function degToRad(deg) {
    return deg * Math.PI / 180;
}

export function rotateVertice(center, point, radian){
    const cos = Math.cos(radian);
    const sin = Math.sin(radian);

    const nPoint = Vector.subtract(point, center);

    let x = (center.x) + ((cos * nPoint.x) - (sin * nPoint.y));
    let y = (center.y) + ((sin * nPoint.x) + (cos * nPoint.y));

    return new Vector(x, y);
}

export function random(min, max) {
    return Math.random() * (max - min) + min;
}

export function convertToCollidable(entity){
    const Box = entity.components.get('System_bounding_box');
    const Transform = entity.components.get('Transform');
    return mapVertices(Transform, Box.vertices);
}

export function mapVertices(transform, vertices){
    const results = [...vertices];
   // console.log(results)
    const {pos: position , rotation, size, scale} = transform;
    // @Todo implement scaling...
    // Update each vertex from the center of the object to the correct offset

    for(let i = 0; i < results.length; i++){
        results[i] = new Vector(0,0).add(position).add(vertices[i])

        if(rotation != 0){
            let center = Vector.add(position, Vector.divide(size, 2));
            let t = rotateVertice(center, results[i], rotation);
            results[i] = t
        }

       // results.push(Vector.add(position, vertices[i]));
    }

    // handle rotation only if the object is rotated
    // if(rotation != 0){
    //     // get difference in objects current pos and center of translated polygon divide by two to get offset.

    //     for(let k = 0; k < results.length; k++){
    //         let t = rotateVertice(center, results[k], rotation);
    //         results[k].set(t);
    //     }

    // }


    return {pos: getCenterOfPoly(results), vertices: results};
}


export default {
    random,
    partition,
    createVertices,
    getCenterOfPoly,
    calculateResolutionVector,
    clamp,
    rotateVertice,
    convertToCollidable,
    mapVertices
}