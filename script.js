/*
https://docs.google.com/document/d/1O4p7wp5PDOXYR603c-Hvf3A5mCqCEAJT4kB97HY5n2I/edit?usp=sharing

using the canvas as a cartesian plane
right handed coordinates

when displaying a 3d vector, we'll only use it's x and y values

*/

const Z_CLIP = -50;

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
    
    const paintframe = () => {
        clearCanvas(canvas_elem);

        background();

        // draw stuff

    };
    paintframe();


    const FPS = 60;

    let running = false;

    let interval;

    // GAME LOOP
    document.addEventListener("click", ()=> {
        if (!running) {
            console.log("game loop started");
            running = true
            interval = setInterval(() => {

                paintframe();
        
            }, 1000/FPS);

        } else {
            clearInterval(interval);
            console.log("game loop stopped");
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