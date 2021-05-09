/****************************
Your variables
****************************/

let original,
    copy,
    trainTutorial;

let laplacianMask = false;
let blurMask = false;
let sharpMask = false;

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
    }
    else if (key == 'b') {
        blurFilter();
        blurMask = (blurMask) ? false : true;
    }
    else if (key == 'RIGHT_ARROW'){

    }
    else if (key == 'LEFT_ARROW'){
        
    }
    else if (key == 'a'){
        sharpFilter();
        sharpMask = (sharpMask) ? false : true;
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
     
    let blur = [[1/16, 1/8, 1/16], [1/8, 1/4, 1/8], [1/16, 1/8, 1/16]];
    //let blur = [[1/256, 4/256, 6/256, 4/256, 1/256], [4/256, 16/256, 24/256, 16/256, 4/256], [6/256, 24/256, 36/256, 24/256, 6/256], [4/256, 16/256, 24/256, 16/256, 4/256], [1/256, 4/256, 6/256, 4/256, 1/256]];
    let sumRed, sumGreen, sumBlue;
    let xpos, ypos, pos;

    console.log(blur.length);

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
                    sumRed += blur[ly+1][lx+1] * original.pixels[pos];
                    sumGreen += blur[ly+1][lx+1] * original.pixels[pos+1];
                    sumBlue += blur[ly+1][lx+1] * original.pixels[pos+2];
                }
            }
            copy.pixels[4*(y*copy.width+x)] = sumRed;
            copy.pixels[4*(y*copy.width+x)+1] = sumGreen;
            copy.pixels[4*(y*copy.width+x)+2] = sumBlue;
        }
    }copy.updatePixels();
}

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
    'left/right arrows : Decrease/increase Blur Effect;',
    'p : Activate/deactivate the pixelization filter;',
    'down/up arrows : Decrease/increase Binning;',
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