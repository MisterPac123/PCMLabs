/****************************
Your variables
****************************/
let original,
    copy;

let trainTutorial;

let red = false
let globalThresholding = false
let mirror = false

let threshold = 150

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
    if (globalThresholding) {
        onlyGlobalThresholding();
        image(copy, 0, 0, copy.width, copy.height);
    } else {
        image(original, 0, 0, original.width, original.height);
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        console.log("left");
        
    }else if (keyCode === RIGHT_ARROW) {
        console.log("right");
        
    }else if (keyCode === UP_ARROW) {
        console.log("up");
        
    }else if (keyCode === DOWN_ARROW) {
        console.log("down");
        
    }else if (key == 't') {
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

function onlyGlobalThresholding() {
    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        if(0.30*copy.pixels[i] + 0.59*copy.pixels[i+1] + 0.11*copy.pixels[i+2] < threshold) {
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

    var instructions = ['UP/DOWN arrows : Increase/decrease brightness;', 'LEFT/RIGHT arrows : Increase/decrease contrast;', 
        'r : Keep only the red component in the image;', 'm : Mirror the image;', 
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

function addContent(container, array) {
    var ul = document.createElement('ul');

    ul.setAttribute('style', 'list-style-type: disc;');

    for (i = 0; i <= array.length - 1; i ++) {
        var li = document.createElement('li'); // create li element.
        li.innerHTML = array[i]; // assigning text to li using array value.

        ul.appendChild(li); // append li to ul.
    }container.appendChild(ul); // add list to the div.
}