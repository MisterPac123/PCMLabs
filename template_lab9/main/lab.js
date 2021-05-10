/****************************
Your variables
****************************/

let original,
    copy,
    trainTutorial;

let laplacianMask = false;
let blurMask = false;
let sharpMask = false;
let pixelizedEfect = false;
let pixelcells = 2;
let blur_m = 1;

/****************************
Core funtions
****************************/

function preload() {
    trainTutorial = loadImage("../train/binningTrain.png");
    //test1 = loadImage("../test/plotsTest_1.png");
    //test2 = loadImage("../test/plotsTest_2.png");
    original = trainTutorial;
}

function setup() {
    var canvas = createCanvas(original.width, original.height);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    addText();
}

function draw() {
    if(laplacianMask){
        resizeCanvas(copy.width, copy.height);
        image(copy, 0, 0, copy.width, copy.height);
    }
    else if(blurMask){
        resizeCanvas(copy.width, copy.height);
        image(copy, 0, 0, copy.width, copy.height);
    }
    else if(sharpMask){
        resizeCanvas(copy.width, copy.height);
        image(copy, 0, 0, copy.width, copy.height);
    }
    else if(pixelizedEfect){
        
    }
    else{
        resizeCanvas(original.width, original.height);
        image(original, 0, 0, original.width, original.height);
    }
}

function keyPressed() {
    if (key >= '0' & key <= '9') {
        changeInput(key);
        resizeCanvas(original.width, original.height);
    }
    else if (key == 'e') {
        edgeDetectionFilter();
        laplacianMask = (laplacianMask) ? false : true;
        blurMask = false;
        sharpMask = false;
        pixelizedEfect = false;
    }
    else if (key == 'b') {
        blurFilter();
        blurMask = (blurMask) ? false : true;
        laplacianMask = false;
        sharpMask = false;
        pixelizedEfect = false;
    }
    else if (keyCode === RIGHT_ARROW){
        if(blurMask && blur_m < 2){
            blur_m++;
            console.log(blur_m);
            blurFilter();
        }
    }
    else if (keyCode === LEFT_ARROW){
        if(blurMask && blur_m > 1){
            blur_m--;
            console.log(blur_m);
            blurFilter();
        }
    }
    else if (key == 'p') {
        pixelizedImage();
        pixelizedEfect = (pixelizedEfect) ? false : true;
        laplacianMask = false;
        sharpMask = false;
        blurMask = false;
    }
    else if (keyCode === UP_ARROW) {
        if(pixelizedEfect){
            pixelcells++;
            pixelizedImage();
        }
    }
    else if (keyCode === DOWN_ARROW) {
        if(pixelizedEfect && pixelcells>2){
            pixelcells--;
            pixelizedImage()
        }
    }
    else if (key == 'a'){
        sharpFilter();
        sharpMask = (sharpMask) ? false : true;
        laplacianMask = false;
        pixelizedEfect = false;
        blurMask = false;
    }
    else if (key == 'r') {
        resetImage();
    }
}


/****************************
Your funtions
****************************/

//Laplacian Mask
function edgeDetectionFilter() {
    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();
     
    let laplacian = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];
    let sumRed, sumGreen, sumBlue;
    let xpos, ypos, pos;

    for (let x = 1; x < copy.width - 1; x++) {
        for (let y = 1; y < copy.height - 1; y++) {
            sumRed = 0;
            sumGreen = 0;
            sumBlue = 0;
            for (let lx = -1; lx <= 1; lx++) {
                for (let ly = -1; ly <= 1; ly++) {
                    xpos = x + lx;
                    ypos = y + ly;
                    pos = 4 * (ypos*copy.width + xpos);
                    sumRed += laplacian[ly+1][lx+1] * original.pixels[pos];
                    sumGreen += laplacian[ly+1][lx+1] * original.pixels[pos+1];
                    sumBlue += laplacian[ly+1][lx+1] * original.pixels[pos+2];
                }
            }
            copy.pixels[4*(y*copy.width+x)] = sumRed;
            copy.pixels[4*(y*copy.width+x)+1] = sumGreen;
            copy.pixels[4*(y*copy.width+x)+2] = sumBlue;
        }
    }copy.updatePixels();
}

function blurFilter(){
    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();
     
    let blur;
    
    if(blur_m == 1) {
        blur = [[1/16, 1/8, 1/16], [1/8, 1/4, 1/8], [1/16, 1/8, 1/16]];
    }
    else {
        blur = [[1/256, 4/256, 6/256, 4/256, 1/256], [4/256, 16/256, 24/256, 16/256, 4/256], [6/256, 24/256, 36/256, 24/256, 6/256], 
        [4/256, 16/256, 24/256, 16/256, 4/256], [1/256, 4/256, 6/256, 4/256, 1/256]];
    }
    
    let sumRed, sumGreen, sumBlue;
    let xpos, ypos, pos;

    for (let x = blur_m; x < copy.width - blur_m; x++) {
        for (let y = blur_m; y < copy.height - blur_m; y++) {
            sumRed = 0;
            sumGreen = 0;
            sumBlue = 0;
            for (let lx = -blur_m; lx <= blur_m; lx++) {
                for (let ly = -blur_m; ly <= blur_m; ly++) {
                    xpos = x + lx;
                    ypos = y + ly;
                    pos = 4 * (ypos*copy.width + xpos);
                    sumRed += blur[ly+blur_m][lx+blur_m] * original.pixels[pos];
                    sumGreen += blur[ly+blur_m][lx+blur_m] * original.pixels[pos+1];
                    sumBlue += blur[ly+blur_m][lx+blur_m] * original.pixels[pos+2];
                }
            }
            copy.pixels[4*(y*copy.width+x)] = sumRed;
            copy.pixels[4*(y*copy.width+x)+1] = sumGreen;
            copy.pixels[4*(y*copy.width+x)+2] = sumBlue;
        }
    }copy.updatePixels();
}

function pixelizedImage() {
    noStroke();

    copy = createImage(original.width, original.height);
    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);
    copy.loadPixels();

    let color;
    let i, j;
    
    for (let y = 0; y < copy.height; y += pixelcells) {
        for (let x = 0; x < copy.width; x += pixelcells) {
                // Get the color at (x, y)
                color=[0,0,0,0];
                for(i =0; y + i < copy.height && i<pixelcells; i++){
                    for(j =0; x + j < copy.width &&  j<pixelcells; j++){
                        let copy_color = copy.get(x+j, y+i)
                        color[0] += copy_color[0];
                        color[1] += copy_color[1];
                        color[2] += copy_color[2];
                        color[3] += copy_color[3];
                    }
                }
                color[0] = color[0]/(i*j);
                color[1] = color[1]/(i*j);
                color[2] = color[2]/(i*j);
                color[3] = color[3]/(i*j);
                fill(color);
                // Draw a rectangle at (x, y) and the size of a cell
                rect(x, y, pixelcells, pixelcells);
        }
    }
}

//Our cool filter
function sharpFilter(){
    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();
     
    let sharp = [[0, -1, 0], [-1, 5, -1], [0, -1, 0]];
    let sumRed, sumGreen, sumBlue;
    let xpos, ypos, pos;

    for (let x = 1; x < copy.width - 1; x++) {
        for (let y = 1; y < copy.height - 1; y++) {
            sumRed = 0;
            sumGreen = 0;
            sumBlue = 0;
            for (let lx = -1; lx <= 1; lx++) {
                for (let ly = -1; ly <= 1; ly++) {
                    xpos = x + lx;
                    ypos = y + ly;
                    pos = 4 * (ypos*copy.width + xpos);
                    sumRed += sharp[ly+1][lx+1] * original.pixels[pos];
                    sumGreen += sharp[ly+1][lx+1] * original.pixels[pos+1];
                    sumBlue += sharp[ly+1][lx+1] * original.pixels[pos+2];
                }
            }
            copy.pixels[4*(y*copy.width+x)] = sumRed;
            copy.pixels[4*(y*copy.width+x)+1] = sumGreen;
            copy.pixels[4*(y*copy.width+x)+2] = sumBlue;
        }
    }copy.updatePixels();
}

function resetImage(){
    laplacianMask = false;
    blurMask = false;
    sharpMask = false;
    pixelizedEfect = false;
    pixelcells = 2;
    blur_m = 1;
}

/****************************
Utility funtions
****************************/

function changeInput(key) {
    var value = key - '0';
    if (value == 1) {
        original = trainTutorial;
    }/* else if (value == 2) {
        original = test1;
    } else if (value == 3) {
        original = test2;
    }*/
}

function addText() { var div = document.getElementById("instructions");

    var instructions = [
    'e : Activate/deactivate the Edge Detection Filter (Laplacian Mask);',
    'b : Activate/deactivate the Gaussian Blur Filter;',
    'left/right arrows : Decrease/increase Blur Effect (when activated);',
    'p : Activate/deactivate the pixelization filter;',
    'down/up arrows : Decrease/increase pixelization filter (when activated);',
    'a : Activate/desactivate our cool filter (Sharpen);', 
    'r : Reset image'];

    var p = document.createElement("p"); // create the paragraph tag
    p.innerHTML = "Instructions: ";
    div.appendChild(p); // add paragraph to the div.

    addContent(div, instructions);

    var inputs = ['1 : train/binningTrain.png (default)', '2 : test/binningTest_1.jpg', '3 : test/binningTest_2.jpg'];

    var p = document.createElement("p"); // create the paragraph tag
    p.innerHTML = "Input: ";
    div.appendChild(p); // add paragraph to the div.

    addContent(div, inputs);
}

function addContent(container, array){
    var ul = document.createElement('ul');

    ul.setAttribute('style', 'list-style-type: disc;');

    for (i = 0; i <= array.length - 1; i ++) {
        var li = document.createElement('li'); // create li element.
        li.innerHTML = array[i]; // assigning text to li using array value.

        ul.appendChild(li); // append li to ul.
    }container.appendChild(ul); // add list to the div.
}