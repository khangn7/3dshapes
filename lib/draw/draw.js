import { canvas_elem, Z_BUFFER } from "../../script.js";
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

function drawPixel(x, y) {
    canvas_elem.getContext("2d").fillRect(x, y, 1, 1);
}

/**
 * inputs should be integers
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 */
export function drawline(x1, y1, x2, y2) {
    // bresenham

    let start_x , end_x, start_y, end_y;
    if (x1 < x2) {
        start_x = x1;
        end_x = x2;
        start_y = y1;
        end_y = y2;
    } else {
        start_x = x2;
        end_x = x1;
        start_y = y2;
        end_y = y1;
    }
    let slope = (end_y - start_y)/(end_x - start_x);
    let mag_slope = Math.abs(slope);
    let sign = slope > 0 ? 1 : -1;

    console.log(start_x, start_y, end_x, end_y)

    let checkpoint = 0.5;

    // if abs(slope) < 1, iterate by x
    if (mag_slope < 1) { 
        
        let y_change = 0;
        let p_y_change = 0;

        for (let x = start_x; x <= end_x; x++) {
            y_change += mag_slope;
            if (y_change > checkpoint) {
                checkpoint++;
                p_y_change++;
            }
            drawPixel(x, start_y + p_y_change * sign);
            console.log(x, start_y + p_y_change * sign)
        }

    }
    // else iterate by y 
    else {

        mag_slope = 1/mag_slope; // reciprocal

        let x_change = 0;
        let p_x_change = 0;

        for (let y = start_y; y != end_y; y += sign) {
            x_change += mag_slope;
            if (x_change > checkpoint) {
                checkpoint++;
                p_x_change++;
            }
            drawPixel(start_x + p_x_change, y);
        }
    }
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