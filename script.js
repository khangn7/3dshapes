/*
https://docs.google.com/document/d/1O4p7wp5PDOXYR603c-Hvf3A5mCqCEAJT4kB97HY5n2I/edit?usp=sharing

using the canvas as a cartesian plane
right handed coordinates

when displaying a 3d vector, we'll only use it's x and y values

*/

import { drawline } from "./lib/draw/draw.js";
import { Vector } from "./lib/functions/math_functions.js";
import { Cube_coords } from "./lib/shape/coords.js";
import { CubeShape } from "./lib/shape/shape.js";
import { FADE_MAX } from "./settings.js";

const Z_CLIP = -50;

export const canvas_elem = document.querySelector("#canvas");
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

    const ctx = canvas.getContext("2d");

    // while (true) {
    //     clearCanvas(canvas_elem);

    //     let x1 = Math.random() * canvas_elem.width,
    //         x2 = Math.random() * canvas_elem.width,
    //         y1 = Math.random() * canvas_elem.height,
    //         y2 = Math.random() * canvas_elem.height;

    //     ctx.beginPath();
    //     ctx.moveTo(x1, y1);
    //     ctx.lineTo(x2, y2);
    //     ctx.stroke()

    //     // ctx.fillStyle = "red";
    //     // drawline(x1, y1, x2, y2);
    //     // ctx.fillStyle = "blue";


    //     await sleep(1000);
    // }
    // return;

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

        // // draw stuff
        // cube.draw_surfaces();


        // let x1 = Math.random() * canvas_elem.width,
        // x2 = Math.random() * canvas_elem.width,
        // y1 = Math.random() * canvas_elem.height,
        // y2 = Math.random() * canvas_elem.height;

        // x1 = Math.round(x1);
        // x2 = Math.round(x2);
        // y1 = Math.round(y1);
        // y2 = Math.round(y2);

        // ctx.beginPath();
        // ctx.moveTo(x1, y1);
        // ctx.lineTo(x2, y2);
        // ctx.stroke()

        // ctx.fillStyle = "red";
        // drawline(x1, y1, x2, y2);
        // ctx.fillStyle = "blue";
    };
    paintframe();

    // return;

    const FPS = 1;

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