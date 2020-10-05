import {Entity, Polygon} from '../classes/object';


function AABB(object1: Entity, object2: Entity): boolean{
    if(
        object1.pos.x < object2.pos.x + object2.size.x &&
        object1.pos.x + object1.size.x > object2.pos.x 
        && object1.pos.y < object2.pos.y + object2.size.y
        && object1.pos.y + object1.size.y > object2.pos.y 
        )
    {
        return true;
    }
    return false
}   

function DIAG(object1: Polygon, object2: Polygon){
    let poly1 = object1;
    let poly2 = object2;

    for(let shape = 0; shape < 2; shape++){
        if (shape == 1){
            poly1 = object2;
            poly2 = object1;
        }

        for(let p = 0; p < poly1.vertices.length; p++){
            let liner1s = poly1.pos;
            let liner1e = poly1.vertices[p];

            for(let q = 0; q < poly2.vertices.length; q++){
                let liner2s = poly2.pos;
                let liner2e = poly2.vertices[(q+1) % poly2.vertices.length];

                let h = (liner2e.x - liner2s.x) * (liner1s.y - liner1e.y) - (liner1s.x - liner1e.x) * (liner2e.y - liner2s.y);
				let t1 = ((liner2s.y - liner2e.y) * (liner1s.x - liner2s.x) + (liner2e.x - liner2s.x) * (liner1s.y - liner2s.y)) / h;
                let t2 = ((liner1s.y - liner1e.y) * (liner1s.x - liner2s.x) + (liner1e.x - liner1s.x) * (liner1s.y - liner2s.y)) / h;
                
                if (t1 >= 0.0 && t1 < 1.0 && t2 >= 0.0 && t2 < 1.0)
					{
						return true;
					}
            }
        }
    }
    return false
}


export {AABB, DIAG}