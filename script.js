/*
https://docs.google.com/document/d/1O4p7wp5PDOXYR603c-Hvf3A5mCqCEAJT4kB97HY5n2I/edit?usp=sharing

using the canvas as a cartesian plane
right handed coordinates

when displaying a 3d vector, we'll only use it's x and y values

*/

import { Vector } from "./lib/functions/math_functions.js";
import { Cube_coords } from "./lib/shape/coords.js";
import { CubeShape } from "./lib/shape/shape.js";
import { FADE_MAX } from "./settings.js";

const Z_CLIP = -50;

const canvas_elem = document.querySelector("#canvas");
canvas_elem.width = window.innerWidth * 1; // 0.99 is to fit screen
canvas_elem.height = window.innerHeight * 1;

// z buffer used in draw.js
export const Z_BUFFER = Array(canvas_elem.width).fill(Array(canvas_elem.height).fill(-Infinity));
function resetZBuffer(arr) {
    let i_n = arr.length;
    for (let i = 0; i < i_n; i++) {
        arr[i].fill(-FADE_MAX);
    }
}

async function main() {

    // set up canvas
    const canvas_elem = document.querySelector("#canvas");
    canvas_elem.width = window.innerWidth * 1; // 0.99 is to fit screen
    canvas_elem.height = window.innerHeight * 1;
    // have to be odd numbers, explained above
    if (canvas_elem.width % 2 == 0) {
        canvas_elem.width--;
    }
    if (canvas_elem.height % 2 == 0) {
        canvas_elem.height--;
    }

    // let c1 = new Vector(100, 100, 0);
    // let c2 = new Vector(100, 200, 0);
    // let c3 = new Vector(200, 100, 0);
    // rasterizeTriangle(canvas_elem, c1, c2, c3);

    // return;
    let cube = makeCube(canvas_elem, 1);
    cube.worldspace_position_set(0, 0, -1000);
    cube.draw_surfaces();

    // return;
    
    const paintframe = () => {
        clearCanvas(canvas_elem);
        // resetZBuffer(Z_BUFFER);

        // draw stuff
        cube.draw_surfaces();
    };
    paintframe();

    // return;

    const FPS = 60;

    let running = false;

    let interval;

    let theta = 0;

    // GAME LOOP
    document.addEventListener("click", ()=> {
        if (!running) {
            console.log("game loop STARTED");
            running = true
            interval = setInterval(() => {

                theta += 0.02;
                cube.rotate_xyz(theta, 0);
                cube.rotate_xyz(theta, 1, true);

                paintframe();

        
            }, 1000/FPS);

        } else {
            clearInterval(interval);
            console.log("game loop STOPPED");
            running = false
        }
    });

    document.body.click();

}

main();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function clearCanvas(canvas) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

function makeCube(canvas_elem, scale) {
    let points = [
        [-100, -100, -100], // back bottom left
        [100, -100, -100], // back bottom right
        [100, 100, -100], // back top right
        [-100, 100, -100], // back top left
        [-100, -100, 100], // front bottom left
        [100, -100, 100], // front bottom right
        [100, 100, 100], // front top right
        [-100, 100, 100] // front top left
    ];
    for (let i = 0; i < points.length; i++) {
        points[i] = new Vector(
            points[i][0] * scale, 
            points[i][1] * scale, 
            points[i][2] * scale
        );
    }
    const coords = new Cube_coords(points);
    return new CubeShape(canvas_elem, coords);
}