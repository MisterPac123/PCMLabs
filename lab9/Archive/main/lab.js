/****************************
Your variables
****************************/
let original,
    copy;
let trainTutorial;
let pixelizedEfect = false;
let pixelcells = 2;


/****************************
Core funtions
****************************/

function preload() {
    trainTutorial = loadImage("../train/binningTrain.png");
    original = trainTutorial;
}

function setup() {
    var canvas = createCanvas(original.width, original.height);

    // Move the canvas so it’s inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    addText();
}

function draw() {
    if(pixelizedEfect){
        
    }else{
        resizeCanvas(original.width, original.height);
        image(original, 0, 0, original.width, original.height);
    }
}

function keyPressed() {
    if (key == 'p') {
        pixelizedImage();
        pixelizedEfect = (pixelizedEfect) ? false : true;
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
    else if (key == 'r') {
        pixelizedEfect = false;
        pixelcells = 2;
    }
}

/****************************
Your funtions
****************************/

function pixelizedImage() {
    noStroke();

    copy = createImage(original.width, original.height);
    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);
    copy.loadPixels();

    let color;
    
    for (let y = 0; y < copy.height; y += pixelcells) {
        for (let x = 0; x < copy.width; x += pixelcells) {
                // Get the color at (x, y)
                color=[0,0,0,0];
                for(let i =0; i<pixelcells; i++){
                    for(let j =0; j<pixelcells; j++){
                        let copy_color = copy.get(x+j, y+i)
                        color[0] += copy_color[0];
                        color[1] += copy_color[1];
                        color[2] += copy_color[2];
                        color[3] += copy_color[3];
                    }
                }
                color[0] = color[0]/(pixelcells*pixelcells);
                color[1] = color[1]/(pixelcells*pixelcells);
                color[2] = color[2]/(pixelcells*pixelcells);
                color[3] = color[3]/(pixelcells*pixelcells);
                fill(color);
                // Draw a rectangle at (x, y) and the size of a cell
                rect(x, y, pixelcells, pixelcells);
        }
    }
}


/****************************
Utility funtions
****************************/

function changeInput(key){

}

function addText(){
    var div = document.getElementById("instructions");

    var instructions = ['up/down arrows : Increase/decrease pixelization filter (when activated);',
    'p : Activate/desactivate pixelization filter;',
    'r : Reset image;'];

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