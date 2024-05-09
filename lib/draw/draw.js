import { Z_BUFFER } from "../../script.js";
import { subtractVectors, Vector } from "../functions/math_functions.js";

/**
 * (only x and y coords of vectors will be used)
 * returns whether point P is to the left of the vector v2 - v1
 * right = false
 * left = true
 * on line spanned by (v2 - v1) = true
 * 
 * @param {Vector} v1
 * @param {Vector} v2
 * @param {Vector} P test point
 * @returns {Boolean}
 */
function edgeFunction(v1, v2, P) {
    return ((P.x - v1.x) * (v2.y - v1.y) - (P.y - v1.y) * (v2.x - v1.x)) >= 0;
}

/**
 * this does not set ctx fillStyle. that's done before this function is called
 *  draws pixels with ctx.fillRect( x, y, 1, 1 );
 * 
 * note: canvas coord z == world space z
 * 
 * @param {*} canvas html canvas obj
 * 
 * @param {Vector} corner1 coordinates on html canvas (this is after coords pipeline)
 * @param {Vector} corner2 after coords pipeline
 * @param {Vector} corner3 after coords pipeline
 * these corners should follow counter clockwise winding
 */
export function rasterizeTriangle(canvas, corner1, corner2, corner3) {

    const ctx = canvas.getContext("2d");

    // coords for bounding box
    let small_x = Math.min(corner1.x, corner2.x, corner3.x);
    let small_y = Math.min(corner1.y, corner2.y, corner3.y);
    let big_x = Math.max(corner1.x, corner2.x, corner3.x);
    let big_y = Math.max(corner1.y, corner2.y, corner3.y);

    // iterate over coords in bounding box
    for (let i = small_x; i <= big_x; i++) {
        for (let j = small_y; j <= big_y; j++) {

            let P = new Vector(i, j, 0);

            // check P against z buffer
            // if (Z_BUFFER[i][j] > P.z) {
            //     continue;
            // }
            // Z_BUFFER[i][j] = P.z;
            // console.log("p")

            // check whether P is in triangle
            // aka. whether it is to the left of all the edges
            if (!edgeFunction(corner1, corner2, P)) {
                continue;
            }
            if (!edgeFunction(corner2, corner3, P)) {
                continue;
            }
            if (!edgeFunction(corner3, corner1, P)) {
                continue;
            }
            // draw
            ctx.fillRect(i, j, 1, 1);
            console.log('a')
        }
    }

}