let original,
    copy,
    trainTutorial;

let luminance_array;
let luminance_hist = false;
let binning = 1;

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
    if(luminance_hist){
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
    
    }else if (key == 'h') {
        luminanceHistogram();
        luminance_hist = (luminance_hist) ? false : true;
    }else if (key == '+') {
        if(luminance_hist){
            increaseBinning();         
        }
    }else if (key == '-') {
        if(luminance_hist){
            decreaseBinning();     
        }
    }
}

function checkKeys() {}

/****************************
Your funtions
****************************/

function increaseBinning() {
    binning+=2;
}

function decreaseBinning() {
    if(binning>2)
        binning-=2;
}

function avgLuminance() {}

function luminanceHistogram() {
    console.log("Luminancee");
    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    luminance_array = new Array();

    for (let i = 0; i<=255/binning; i++){
        luminance_array[i]=0;
    }

    for (let i = 0; i < 4 * (original.width * original.height); i += 4) {
        v_red = (copy.pixels[i]);
        v_green = (copy.pixels[i+1]); // g
        v_blue = (copy.pixels[i+2]); // b
       // console.log(int(v_red*0.3 + v_green*0.59 + v_blue*0.11))
        
        luminance_array[int(v_red*0.3 + v_green*0.59 + v_blue*0.11)/binning]++;
    };

    v_max = Math.max.apply(Math, luminance_array);

    stroke(255,255,255)

    for (x = 0; x <= luminance_array.length; x++) {
        index = luminance_array[x];
        
        y1 = int(map(index, 0, v_max, original.height, 0));
        y2 = height;
        xPos = map(x,0,luminance_array.length,0, original.width)
        line(xPos, y1, xPos, y2);
    }
}

function rgbHistogram() {}

/****************************
Utility funtions
****************************/

function changeInput(key) {}

function addText() { var div = document.getElementById("instructions");

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

