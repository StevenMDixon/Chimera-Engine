import Vector2D from './vector';

export function getCenterOfPoly(vertices: Vector2D[]){
    let center = new Vector2D(0,0);
    vertices.forEach(vertice => center.add(vertice));
    return center.divide(vertices.length);
}

export function createVertices(v: any[]){
    return v.map(vertice => {
            return new Vector2D(vertice.x, vertice.y)
        })
}

export function createVerticesFromSize(Position: Vector2D, Size: Vector2D){
    let vectors = [
        new Vector2D(Position.x, Position.y), 
        new Vector2D(Position.x + Size.x, Position.y),
        new Vector2D(Position.x + Size.x, Position.y + Size.y),
        new Vector2D(Position.x , Position.y + Size.y),
    ];
    return vectors
}

export function partition(array, isValid) {
    return array.reduce(([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
}

export function convertToCollidable(gameObject){
    let newE = {};

    if(gameObject.hasComponent("Polygon")){
        const {vertices} = gameObject.getComponent("Polygon");
        newE['vertices'] = vertices;
        newE['pos'] = getCenterOfPoly(vertices);
    }else if(gameObject.hasComponent("Size")){
        let {pos} = gameObject.getComponent("Position");
        let {size} = gameObject.getComponent("Size");
        let vertices = createVerticesFromSize(pos, gameObject.getComponent("Size").size);
        newE['pos'] = {x: pos.x + size.x/2, y: pos.y + size.y/2}
        newE['vertices'] = vertices;
    }

    return newE;
}