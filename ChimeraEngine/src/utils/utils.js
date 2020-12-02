import Vector2D from './vector';

export function getCenterOfPoly(vertices){
    return vertices.reduce((acc, cur)=>{
        acc.add(cur);
        return acc;
    }, new Vector2D(0,0)).divide(vertices.length)
}  

export function createVertices(v){
    return v.map(vertice => {
            return new Vector2D(vertice.x, vertice.y)
    })
}

export function createVerticesFromSize(Position, Size){
    return [
        new Vector2D(Position.x, Position.y), 
        new Vector2D(Position.x + Size.x, Position.y),
        new Vector2D(Position.x + Size.x, Position.y + Size.y),
        new Vector2D(Position.x , Position.y + Size.y)
    ];
}

export function partition(array, isValid) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
}

export function convertToCollidable(gameObject){
    const newE = {};

    if(gameObject.hasComponent("Polygon")){
        const {vertices} = gameObject.getComponent("Polygon");
        newE['vertices'] = vertices;
        newE['pos'] = getCenterOfPoly(vertices);
    }else if(gameObject.hasComponent("Size")){
        let {pos} = gameObject.getComponent("Position");
        let {size} = gameObject.getComponent("Size");
        let vertices = createVerticesFromSize(pos, size);
        newE['og'] = new Vector2D(pos.x, pos.y);
        newE['pos'] = new Vector2D(pos.x + size.x/2,pos.y + size.y/2)
        newE['vertices'] = vertices;
    }

    return newE;
}

export function createCollidable(x,y,w,h){
   const pos = new Vector2D(x, y), size = new Vector2D(w,h);
   return {
       og: new Vector2D(x, y),
       pos: new Vector2D( x + w/2, y + h/2),
       vertices: createVerticesFromSize(pos, size)
   }
}

export function random(min, max) {
    return Math.random() * (max - min) + min;
}