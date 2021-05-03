let original,
    copy,
    trainTutorial;

let luminance_array;
let luminance_hist = false;
let binning = 1;
let avgluminance = false;
let rgbHist = false;

function preload() {
    trainTutorial = loadImage("../train/plotsTrain.png");
    test1 = loadImage("../test/plotsTest_1.png");
    test2 = loadImage("../test/plotsTest_2.png");
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
    else if (avgluminance){
    }
    else if (rgbHist){
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
    
    }else if (key == 'l') {
        avgLuminance();
        avgluminance = (avgluminance) ? false : true;
        luminance_hist = false;
        rgbHist = false;

    }else if (key == 'h') {
        luminanceHistogram();
        luminance_hist = (luminance_hist) ? false : true;
        avgluminance = false;
        rgbHist = false;

    }else if (key == '+') {
        if(luminance_hist){
            increaseBinning();         
        }
    }else if (key == '-') {
        if(luminance_hist){
            decreaseBinning();     
        }
    }
    else if (key == 's') {
        rgbHistogram();
        rgbHist = (rgbHist) ? false : true;   
        avgluminance = false;
        luminance_hist = false;
    }
    else if (key == 'r') {
        console.log("chega aqui");
        resetImage();
        luminance_hist = false;
        binning = 1;
        avgluminance = false;
        rgbHist = false;
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

function avgLuminance() {
    let red, blue, green;
    let lum, avgLum;
    let px = 0;
    let py;
    let x = 0;

    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    stroke(255,0,0);
     
    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        red = (original.pixels[i] * 0.2126);
        green = (original.pixels[i+1] * 0.7152); // g
        blue = (original.pixels[i+2] * 0.0722); // b
        copy.pixels[i] = red+green+blue;
        copy.pixels[i+1] = red+green+blue;
        copy.pixels[i+2] = red+green+blue;
    }copy.updatePixels();

    image(copy, 0, 0, copy.width, copy.height);

    stroke(255,0,0);
    for (let c = 0; c < 4 * copy.width; c += 4) {
        for (let i = c; i <= c + 4 * (copy.width * (copy.height-1)); i += 4 * copy.width) {
            if(i==c)
                lum=0;
            lum = lum + (0.3*copy.pixels[i] + 0.59*copy.pixels[i+1] + 0.11*copy.pixels[i+2]);
        } 
        
        avgLum = copy.height - (lum / copy.height);

        if (c==0){
            py=avgLum;
        }
        line(px , py, x, avgLum);
        px=x;
        py=avgLum;
        x=x+1;
    }
}

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
        v_red = (original.pixels[i]);
        v_green = (original.pixels[i+1]); // g
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
    copy.updatePixels();
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

function resetImage(){
    resizeCanvas(original.width, original.height);
    image(original, 0, 0, original.width, original.height);
}

/****************************
Utility funtions
****************************/

function changeInput(key) {
    var value = key - '0';
    if (value == 1) {
        original = trainTutorial;
    } else if (value == 2) {
        original = test1;
    } else if (value == 3) {
        original = test2;
    }
}

function addText() { var div = document.getElementById("instructions");

    var instructions = [
    'l : Activate/desactivate luminance line chart;',
    'h : Activate/desactivate luminance histogram;',
    '-/+: Decrease/increase binning',
    's : Activate/desactivate RGB histogram;',  
    'r : Reset image;'];

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

