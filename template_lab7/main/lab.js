/****************************
Your variables
****************************/
let original,
    copy;

let trainTutorial;

let brightRate = 1;
let brightChange=false;

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
    if(brightChange){
        resizeCanvas(copy.width, copy.height);
        image(copy, 0, 0, copy.width, copy.height);
    }else{
        resizeCanvas(original.width, original.height);
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
        increaseBright();
        brightChange = true;
        
    }else if (keyCode === DOWN_ARROW) {
        console.log("down");
        decreaseBright();
        brightChange = true;
    }
}

/****************************
Your funtions
****************************/

function increaseBright() {
    console.log("estou no increaseBright");

    if(brightRate<3){
        brightRate+=0.2;
    }
    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        copy.pixels[i] = original.pixels[i] * brightRate; // r
        copy.pixels[i + 1] = original.pixels[i + 1] * brightRate;; // g
        copy.pixels[i + 2] = original.pixels[i + 2] * brightRate;; // b
    }copy.updatePixels();
    console.log("brightRate:" + brightRate);
}

function decreaseBright() {
    console.log("estou no increaseBright");

    if(brightRate>0){
        brightRate-=0.2;
    }
    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        copy.pixels[i] = original.pixels[i] * brightRate; // r
        copy.pixels[i + 1] = original.pixels[i + 1] * brightRate;; // g
        copy.pixels[i + 2] = original.pixels[i + 2] * brightRate;; // b
    }copy.updatePixels();
    console.log("brightRate:" + brightRate);
}


/****************************
Utility funtions
****************************/

function changeInput(key){

}

function addText(){
    var div = document.getElementById("instructions");

    var instructions = ['UP/DOWN arrows : increase/decrease brightness', 'LEFT/RIGHT arrows : increase/decrease contrast', ' r : Keep only the red component in the image;','m : mirror the image;' ];

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