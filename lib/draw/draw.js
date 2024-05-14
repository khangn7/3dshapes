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
 * bresenham algo
 * inputs should be integers
 * @param {Number} x1 
 * @param {Number} y1 
 * @param {Number} x2 
 * @param {Number} y2 
 * @param {Boolean} gen generate array of all pixels on line and return it, as opposed to drawing line
 */
export function drawline(x1, y1, x2, y2, gen=false) {

    // if (!Number.isInteger(x1) || !Number.isInteger(y1) || !Number.isInteger(x2) || !Number.isInteger(y2)) {
    //     throw "input arent ints"
    // }
    const arr = [];

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

    // console.log(start_x, start_y, end_x, end_y)

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
 * 
 * @param {Vector} c1 corner1 - coordinates on html canvas (this is after coords pipeline)
 * @param {Vector} c2 corner2 - after coords pipeline
 * @param {Vector} c3 corner3 - after coords pipeline
 * these corners should follow counter clockwise winding
 */
export function rasterizeTriangle(c1, c2, c3) {

    const ctx = canvas_elem.getContext("2d");

    // sort corners by x and y
    const crn = [c1, c2, c3];
    const y_sort = [0, 1, 2].sort((a, b) => crn[a].y - crn[b].y); // ascending y

    const f12 = crn[y_sort[0]].y == crn[y_sort[1]].y;
    const flat_edge = f12 || (crn[y_sort[1]].y == crn[y_sort[2]].y);

    // if triangle as edge that is horizontal
    if (flat_edge) {
        // get corner that is odd one out
        let odd_c, left_c, right_c;
        if (f12) {
            odd_c = crn[y_sort[2]];
            if (crn[y_sort[0]].x < crn[y_sort[1]].x ) {
                left_c = crn[y_sort[0]];
                right_c = crn[y_sort[1]];
            } else {
                left_c = crn[y_sort[1]];
                right_c = crn[y_sort[0]];
            }
        } else {
            odd_c = crn[y_sort[0]];
            if (crn[y_sort[1]].x < crn[y_sort[2]].x ) {
                left_c = crn[y_sort[1]];
                right_c = crn[y_sort[2]];
            } else {
                left_c = crn[y_sort[2]];
                right_c = crn[y_sort[1]];
            }
        }

        // if flat edge in on the bottom
        if (odd_c.y < left_c.y) {
            
            let r_slope = (odd_c.)

        }
    }
    // else
    else {

    }

}