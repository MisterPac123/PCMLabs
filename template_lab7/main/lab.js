/****************************
Your variables
****************************/
let original,
    copy;

let trainTutorial;

let contrastRate = 1;
let brightIncrement = 0;
let originalChange = false;
let negativeEfect = false;
let globalThresholding = false;

let threshold = 150;

/****************************
Core funtions
****************************/

function preload() {
    trainTutorial = loadImage("../train/pixelsTrain.png");
    original = trainTutorial;
}

function setup() {
    var canvas = createCanvas(original.width, original.height);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    addText();
}

function draw() {
    if(originalChange){
        resizeCanvas(copy.width, copy.height);
        image(copy, 0, 0, copy.width, copy.height);
    }else if(negativeEfect) {
        resizeCanvas(copy.width, copy.height);
        image(copy, 0, 0, copy.width, copy.height);
	}else if (globalThresholding) {
        onlyGlobalThresholding();
        image(copy, 0, 0, copy.width, copy.height);
    }else{
        resizeCanvas(original.width, original.height);
        image(original, 0, 0, original.width, original.height);
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        if(contrastRate>0){
            contrastRate-=0.2;
        }
        renderContrast();
        console.log("left");
        originalChange = true;
        
    }else if (keyCode === RIGHT_ARROW) {
        if(contrastRate<5){
            contrastRate+=0.2;
        }
        renderContrast();
        console.log("right");
        originalChange = true;
        
    }else if (keyCode === UP_ARROW) {
        if(brightIncrement<150){
            brightIncrement+=15;
        }
        renderBright();
        originalChange = true;
        
    }else if (keyCode === DOWN_ARROW) {
        if(brightIncrement>-150){
            brightIncrement-=15;
        }
        renderBright();
        originalChange = true;

    }else if (key == 'r') {
        resetImage();
    }else if (key == 'n') {
        negativeImage();
        negativeEfect = (negativeEfect) ? false : true;
		
    }else if (key == 't') {
        onlyGlobalThresholding();
        globalThresholding = (globalThresholding) ? false : true;

    }else if (key == 'a') {
        if(globalThresholding)
            threshold = threshold - 1;

    }else if (key == 's') {
        if(globalThresholding)
            threshold = threshold + 1;
    }  
}

/****************************
Your funtions
****************************/

function resetImage(){
    originalChange = false;
    brightIncrement=0;
    contrastRate=1;
}

function renderBright() {

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        copy.pixels[i] = original.pixels[i] + brightIncrement; // r
        copy.pixels[i + 1] = original.pixels[i + 1] + brightIncrement;; // g
        copy.pixels[i + 2] = original.pixels[i + 2] + brightIncrement;; // b
    }copy.updatePixels();
    console.log("brightRate:" + brightIncrement);
}


function renderContrast() {
    
    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        copy.pixels[i] = contrastRate*(original.pixels[i]-127)+127; // r
        copy.pixels[i + 1] = contrastRate*(original.pixels[i+1]-127)+127;; // g
        copy.pixels[i + 2] = contrastRate*(original.pixels[i+2]-127)+127;; // b
    }copy.updatePixels();
    console.log("contrast change:" + contrastRate);
}

function negativeImage() {

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        copy.pixels[i] = 255 - original.pixels[i]; // r
        copy.pixels[i + 1] = 255 - original.pixels[i+1];; // g
        copy.pixels[i + 2] = 255 - original.pixels[i+2];; // b
    }copy.updatePixels();
    console.log("contrast change:" + contrastRate);
}

function onlyGlobalThresholding() {
    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        if(0.30*original.pixels[i] + 0.59*original.pixels[i+1] + 0.11*original.pixels[i+2] < threshold) {
            copy.pixels[i] = 0;
            copy.pixels[i+1] = 0;
            copy.pixels[i+2] = 0;
        }else{
            copy.pixels[i] = 255;
            copy.pixels[i+1] = 255;
            copy.pixels[i+2] = 255;
        }
    }copy.updatePixels();
}

/****************************
Utility funtions
****************************/

function changeInput(key){

}

function addText(){
    var div = document.getElementById("instructions");

    var instructions = ['UP/DOWN arrows : Increase/decrease brightness;', 'LEFT/RIGHT arrows : Increase/decrease contrast;', 'r : Reset image;', 'n : Negative efect;',
	't : Activate/deactivate the global thresholding aplication;', 'a : Decrease threshold value;', 's : Increase threshold value;'];

    var p = document.createElement("p"); // create the paragraph tag
    p.innerHTML = "Instructions: ";
    div.appendChild(p); // add paragraph to the div.

    addContent(div, instructions);

    var inputs = ['1 : train/tutorial.png (default)', '2 : test/zuri.jpeg'];

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