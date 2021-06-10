import Vector from './vectors';

function AABB(object1, object2){
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
    
function SAT(p1, p2){
    let axes = [];

    let smallestOverlap;

    let MTVAxis;

    let numVerts1 = p1.vertices.length;
    let numVerts2 = p2.vertices.length;

    for (let i = 0; i < numVerts1; i++) {
        // For each vertex, get it's neighbor
        // For the last vertex, wrap around and grab the first vertex
        let v1 = p1.vertices[i];
        let v2 = p1.vertices[i + 1 === p1.vertices.length ? 0 : i + 1];		// Wraps around the array

        // Create a vector to hold the axis.  Start with the edge between two vertices
        let axis = Vector.subtract(v1, v2);

        // Normalize it, then make a normal vector by applying the .perp() method
        // which rotates the vector 90 degrees
        axis.normalize().perp();

        // Capture this axis in our list of axes
        axes.push(axis);
    }

    for (let i = 0; i < numVerts2; i++) {
        let v1 = p2.vertices[i];
        let v2 = p2.vertices[i + 1 === p2.vertices.length ? 0 : i + 1];
        let axis = Vector.subtract(v1, v2);
        axis.normalize().perp();
        axes.push(axis);
    }

    for (let i = 0; i < axes.length; i++) {
        // Get the individual axis
        let axis = axes[i];

        // Here's some magic - We're projecting the body onto the axis like we talked about above,
        // We'll implement the .projectBody() method in a moment
        // But know that it returns the results of projecting a body onto an axis
        let p1Projection = projectBody(p1, axis);
        let p2Projection = projectBody(p2, axis);

        // A little more magic.  This tells us if two lines on the same axis
        // Overlap at all.  We'll also implement this in a moment, but for now
        // know that it returns either 0 for no overlap, or an integer amount of overlap of the two lines
        let overlap = lineOverlap(p1Projection.min, p1Projection.max, p2Projection.min, p2Projection.max);

        // If at any point the overlap is zero, then we're guaranteed
        // to have no collision, so exit the test
        if (overlap === 0) {
            return;
        }

        // We know we want to keep track of the smallest overlap to be used for collision resolution
        if (smallestOverlap) {
            // If this overlap is smaller than the current smallest...
            // capture the value, and the axis that goes along with it
            if (overlap < smallestOverlap) {
                smallestOverlap = overlap;
                MTVAxis = axis;
            }
        } else {
            smallestOverlap = overlap;
            MTVAxis = axis;
        }
    }
    let p2top1 = Vector.subtract(p2.pos, p1.pos);
    if (MTVAxis.dot(p2top1) >= 0) {
        MTVAxis.negate();
    }

    // Return our freshly created collision object
    return {p1, p2, MTVAxis, smallestOverlap};
}


function projectBody (b, axis) {
    // We'll handle projections differently for polygons and circles
    // Polygon case
    //if (b.type === 'rectangle' || b.type === 'polygon') {

        // First, grab the first vertex and set it to be our current minimum
        // and maximum. We need to start somewhere, right?
        let min = b.vertices[0].scalarProjectUnit(axis);
        let max = min;

        // Loop through all vertices on the body,
        // project the vertex, then check to see if it's less than the current
        // min or greater than the current max
        for (let i = 0; i < b.vertices.length; i++) {
            // Get the vertex
            let v = b.vertices[i];

            // Project it using scalar projection (Note, we've added a .scalarProjectUnit() method to
            // our vector class.  I'll leave that for you to figure out how to
            // do)
            let p = v.scalarProjectUnit(axis);

            // Check if it's smaller or larger than the min or max,
            // respectively
            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }
        // Return the min and max values
        return {min, max};
    // } else if (b.type === 'circle') {

    //     // Cirle case
    //     // Cirles don't have vertices, so we project the center onto the axis,
    //     // and offset the min and max by the radius of the circle.
    //     let p = b.position.scalarProjectUnit(axis);
    //     console.log()
    //     return {min: p - b.scaledRadius, max: p + b.scaledRadius};
    // }
};

function lineOverlap (p1min, p1max, p2min, p2max) {
    // Get the minimum of the two rightmost points
    let min1 = Math.min(p1max, p2max);

    // Get the maximum of the two leftmost points
    let max1 = Math.max(p1min, p2min);

    // The difference between those is the overlap.
    let diff = min1 - max1;

    // If the diff has a positive value, that's the overlap, otherwise return
    // 0 for no overlap
    return Math.max(0, diff);

    // We could write this all in one line, like so, if we were so inclined
    // return Math.max(0, Math.min(p1max, p2max) - Math.max(p1min, p2min));
};


function circlecircle(c1, c2) {

    // Get vector between two centers
    let v1 = Vector.subtract(c2.position, c1.position);

    // The magnitude is the distance, so get that.
    let d = v1.mag();

    // Sum up the radii (note we're using the bodies scaledRadius)
    // because that's what drawn by the renderer
    let rplusr = c1.scaledRadius + c2.scaledRadius;

    // Check for overlap
    if (d < rplusr) {

        // Ensure mtv axis points from p2 to p1
        let c2toc1 = Vector.subtract(c2.position, c1.position);
        if (v1.dot(c2toc1) >= 0) {
            v1.negate();
        }

        // Where's this collision function coming from!?
        // We'll get there...
        // What's important to note is that we're keeping track of
        // the following things:
        //      1. Both bodies involved in the collision
        //      2. The amount in which the bodies are overlapping (rplusr - d)
        //      3. And the vector pointing from the center of circle 1 to
        //         circle 2
        return collision(c1, c2, v1.normalize(), rplusr - d);
    }
    return
}


const Collision = {
    init: function(b1, b2, mtv, overlap) {
        this.body1 = b1;
        this.body2 = b2;
        this.mtvaxis = mtv;
        this.overlap = overlap;
        this.penetration = {x: mtv.x * overlap, y: mtv.y * overlap};
    }
};

// Convenience constructor
const collision = function(b1, b2, mtv, overlap) {
    let c = Object.create(Collision);
    c.init(b1, b2, mtv, overlap);
    return c;
};



export {AABB, SAT}