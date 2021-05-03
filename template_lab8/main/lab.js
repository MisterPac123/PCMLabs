/****************************
Your variables
****************************/
let original,
    copy;

let trainTutorial;

let rgbHist = false;

function preload() {
    trainTutorial = loadImage("../train/plotsTrain.png");

    original = trainTutorial;
}

function setup() {
    var canvas = createCanvas(original.width, original.height);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    addText();
}

function draw() {
    if (rgbHist){
    }else{
        resizeCanvas(original.width, original.height);
        image(original, 0, 0, original.width, original.height);
    }
}

function keyPressed() {
    if (key >= '0' & key <= '9') {
        changeInput(key);
        resizeCanvas(original.width, original.height);
    
    }else if (key == 's') {
        rgbHistogram();
        rgbHist = (rgbHist) ? false : true;
        globalThresholding = false;
        negativeEfect = false;
        mono = false;   
        greyscale = false;     
    }
}


function checkKeys() {}

/****************************
Your funtions
****************************/

function increaseBinning() {}

function decreaseBinning() {}

function avgLuminance() {}

function luminanceHistogram() {}

function rgbHistogram() {

    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    arrayR = new Array();
    arrayG = new Array();
    arrayB = new Array();

    for (let i = 0; i<=255; i++){
        arrayR[i]=0;
        arrayG[i]=0;
        arrayB[i]=0;
    }

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        arrayR[original.pixels[i]] += 1;
        arrayG[original.pixels[i+1]] += 1;
        arrayB[original.pixels[i+2]] += 1;
    }

    let maximum = 0;

    for (let i = 0; i <= 255; i++)
        if(arrayR[i]+arrayG[i]+arrayB[i] > maximum)
            maximum = arrayR[i]+arrayG[i]+arrayB[i];

    for (let i = 0; i <= 255; i++) {
        stroke(255,0,0)
        y1 = original.height;
        y2 = original.height - (arrayR[i]/maximum)*original.height;
        xPos = (i/255)*original.width;
        line(xPos, y1, xPos, y2);

        stroke(0,255,0)
        y1 = original.height - (arrayR[i]/maximum)*original.height;
        y2 = original.height - (arrayR[i]/maximum)*original.height - (arrayG[i]/maximum)*original.height;
        xPos = (i/255)*original.width;
        line(xPos, y1, xPos, y2);

        stroke(0,0,255)
        y1 = original.height - (arrayR[i]/maximum)*original.height - (arrayG[i]/maximum)*original.height;
        y2 = original.height - (arrayR[i]/maximum)*original.height - (arrayG[i]/maximum)*original.height - (arrayB[i]/maximum)*original.height;
        xPos = (i/255)*original.width;
        line(xPos, y1, xPos, y2);
    }
}

/****************************
Utility funtions
****************************/

function changeInput(key) {
    var value = key - '0';
    if (value == 1) {
        original = trainTutorial;
    }
}

function addText(){
    var div = document.getElementById("instructions");

    var instructions = ['up/down arrows : Increase/decrease brightness;', 'left/right arrows : Increase/decrease contrast;',
    'l : Activate/desactivate greyscale;',
    'm : Activate/desactivate monochrome;',  
    'q : Decrease hue;', 'w : Increase hue;', 
    't : Activate/desactivate the global thresholding aplication;', 'a : Decrease threshold value;', 's : Increase threshold value;', 
    'n : Negative effect (our cool effect);', 'z : Decrease percentage of image to be negative;', 
    'x : Decrease percentage of image to be negative;', 'r : Reset image;'];

    var p = document.createElement("p"); // create the paragraph tag
    p.innerHTML = "Instructions: ";
    div.appendChild(p); // add paragraph to the div.

    addContent(div, instructions);

    var inputs = ['1 : train/tutorial.png (default)', '2 : test/pixelsTest_1.jpg', '3 : test/pixelsTest_2.jpeg'];

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