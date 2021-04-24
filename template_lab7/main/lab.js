/****************************
Your variables
****************************/
let original,
    copy;

let trainTutorial;

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
    resizeCanvas(original.width, original.height);
    image(original, 0, 0, original.width, original.height);
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
        
    }
}

/****************************
Your funtions
****************************/


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

}