import { Vector } from "../functions/math_functions";

export class Pixel {
    /**
     * 
     * @param {*} z_value 
     * @param {Array[Number]} color [256, 256, 256]
     */
    constructor (z_value, color) {
        this.z = z_value;
        this.color = color;
    }
}

/**
 * this does not set ctx fillStyle. that's done before this function is called
 *  draws pixels with ctx.fillRect( x, y, 1, 1 );
 * 
 * @param {*} canvas 
 * @param {Vector} canvas_coords coordinates on html canvas (this is after coords pipeline)
 * @param {Vector} world_coords coordinates in world space (before coords pipeline)
 */
export function rasterizeTriangle(canvas, canvas_coords, world_coords) {

}