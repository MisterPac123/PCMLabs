/****************************
Your variables
****************************/
let original,
    copy,
    copyBright,
    copyContrast;

let trainTutorial;

let contrastRate = 1;
let brightIncrement = 0;
let contrastChange = false;
let brightChange = false;
let negativeEfect = false;
let globalThresholding = false;
let mono = false;   
let greyscale = false;

let threshold = 150;
let hue = 0;

/****************************
Core funtions
****************************/

function preload() {
    trainTutorial = loadImage("../train/pixelsTrain.png");
    original = trainTutorial;
    copyBright = trainTutorial;
    copyContrast = trainTutorial;
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
    }else if (mono) {
        onlyMonochrome();
        image(copy, 0, 0, copy.width, copy.height);
    }
    else if (greyscale){
        onlyGreyscale();
        image(copy, 0, 0, copy.width, copy.height);
<<<<<<< HEAD
    }
    else if(contrastChange){
        resizeCanvas(copyContrast.width, copyContrast.height);
        image(copyContrast, 0, 0, copyContrast.width, copyContrast.height);
    
    }
    else if(brightChange){
        resizeCanvas(copyBright.width, copyBright.height);
        image(copyBright, 0, 0, copyBright.width, copyBright.height);
=======
    
>>>>>>> 1933222e6f9db18869d931843f8452350bc25c35
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
        contrastChange = true;
        brightChange = false;

        
    }else if (keyCode === RIGHT_ARROW) {
        if(contrastRate<5){
            contrastRate+=0.2;
        }
        renderContrast();
        contrastChange = true;
        brightChange = false;
        
    }else if (keyCode === UP_ARROW) {
        if(brightIncrement<150){
            brightIncrement+=15;
        }
        renderBright();
        brightChange = true;
        contrastChange = false;
        
    }else if (keyCode === DOWN_ARROW) {
        if(brightIncrement>-150){
            brightIncrement-=15;
        }
        renderBright();
        brightChange = true;
        contrastChange = false;

    }else if (key == 'r') {
        resetImage();
    }else if (key == 'n') {
        negativeImage();
        negativeEfect = (negativeEfect) ? false : true;
        if(!negativeEfect)
            originalChange = false;
		
    }else if (key == 't') {
        onlyGlobalThresholding();
        globalThresholding = (globalThresholding) ? false : true;
        if(!negativeEfect)
            originalChange = false;


    }else if (key == 'a') {
        if(globalThresholding){
            threshold = threshold - 1;
            onlyGlobalThresholding();
        }


    }else if (key == 's') {
        if(globalThresholding){
            threshold = threshold + 1;
            onlyGlobalThresholding();
        } 
    }else if (key == 'l') {
        greyscale = (greyscale) ? false : true;
        if(!negativeEfect)
            originalChange = false;


    }else if (key == 'm') {
        mono = (mono) ? false : true;
    
    }else if (key == 'q') {
        if(mono){
            hue = hue - 30;
            if(hue<=0)
                hue = hue + 360;
        }

    }else if (key == 'w') {
        if(mono){
            hue = hue + 30;
            if(hue>=360)
                hue = hue - 360;
        }
    }
}

/****************************
Your funtions
****************************/

function resetImage(){
    mono = false;   
    greyscale = false;
    brightChange = false;
    contrastChange = false;
    globalThresholding = false;
    brightIncrement=0;
    contrastRate=1;
    threshold=150;
    hue = 0;
    copyBright = trainTutorial;
    copyContrast = trainTutorial;
}

function renderBright() {

    copyBright = createImage(copyContrast.width, copyContrast.height);

    copyBright.copy(copyContrast, 0, 0, copyContrast.width, copyContrast.height, 0, 0, copyContrast.width, copyContrast.height);

    copyBright.loadPixels();

    for (let i = 0; i < 4 * (copyBright.width * copyBright.height); i += 4) {
        copyBright.pixels[i] = copyContrast.pixels[i] + brightIncrement; // r
        copyBright.pixels[i + 1] = copyContrast.pixels[i + 1] + brightIncrement;; // g
        copyBright.pixels[i + 2] = copyContrast.pixels[i + 2] + brightIncrement;; // b
    }copyBright.updatePixels();
    console.log("brightRate:" + brightIncrement);
}


function renderContrast() {
    
    copyContrast = createImage(copyBright.width, copyBright.height);

    copyContrast.copy(copyBright, 0, 0, copyBright.width, copyBright.height, 0, 0, copyBright.width, copyBright.height);

    copyContrast.loadPixels();

    for (let i = 0; i < 4 * (copyContrast.width * copyContrast.height); i += 4) {
        copyContrast.pixels[i] = contrastRate*(copyBright.pixels[i]-127)+127; // r
        copyContrast.pixels[i + 1] = contrastRate*(copyBright.pixels[i+1]-127)+127;; // g
        copyContrast.pixels[i + 2] = contrastRate*(copyBright.pixels[i+2]-127)+127;; // b
    }copyContrast.updatePixels();
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

function onlyGreyscale() {
    let red, blue, green;

    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        red = (original.pixels[i] * 0.2126);
        green = (original.pixels[i+1] * 0.7152); // g
        blue = (original.pixels[i+2] * 0.0722); // b
        copy.pixels[i] = red+green+blue;
        copy.pixels[i+1] = red+green+blue;
        copy.pixels[i+2] = red+green+blue;
    }copy.updatePixels();
}

function onlyMonochrome() {
    let r,g,b,max,min,V,S,C,X,M;

    resizeCanvas(original.width, original.height);

    copy = createImage(original.width, original.height);

    copy.copy(original, 0, 0, original.width, original.height, 0, 0, original.width, original.height);

    copy.loadPixels();

    for (let i = 0; i < 4 * (copy.width * copy.height); i += 4) {
        copy.pixels[i] = 0;
        copy.pixels[i + 2] = 0;

        r = original.pixels[i]/255;
        g = original.pixels[i + 1]/255; // g
        b = original.pixels[i + 2]/255; // b

        if (r>=g && r>=b)
            max=r;
        else if (g>=r && g>=b)
            max=g;
        else if (b>=r && b>=g)
            max=b;

        if (r<=g && r<=b)
            min=r;
        else if (g<=r && g<=b)
            min=g;
        else if (b<=r && b<=g)
            min=b;
        
        /*if (max == r)  
            hue = (g-b)/(max-min)
        else if (max == g)  
            hue = 2.0 + (b-r)/(max-min)
        else if (max == b)
            hue = 4.0 + (r-g)/(max-min)*/

        V=max;

        if (max==0)
            S=0;
        else 
            S=(max-min)/max;

        C=V*S;
        
        X=(V*S) * (1 - Math.abs((hue/60)%2 - 1));
        M=V-C;

        if(0<=hue && hue<60){
            copy.pixels[i]=(C+M)*255;
            copy.pixels[i+1]=(X+M)*255;
            copy.pixels[i+2]=0;
        }
        else if(60<=hue && hue<120){
            copy.pixels[i]=(X+M)*255;
            copy.pixels[i+1]=(C+M)*255
            copy.pixels[i+2]=0;
        }
        else if(120<=hue && hue<180){
            copy.pixels[i]=0;
            copy.pixels[i+1]=(C+M)*255;
            copy.pixels[i+2]=(X+M)*255;
        }
        else if(180<=hue && hue<240){
            copy.pixels[i]=0;
            copy.pixels[i+1]=(X+M)*255;
            copy.pixels[i+2]=(C+M)*255;
        }
        else if(240<=hue && hue<300){
            copy.pixels[i]=(X+M)*255;
            copy.pixels[i+1]=0;
            copy.pixels[i+2]=(C+M)*255;
        }
        else if(300<=hue && hue<360){
            copy.pixels[i]=(C+M)*255;
            copy.pixels[i+1]=0;
            copy.pixels[i+2]=(X+M)*255;
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

    var instructions = ['up/down arrows : Increase/decrease brightness;', 'left/right arrows : Increase/decrease contrast;',
    'l : Activate/desactivate greyscale;',
    'm : Activate/desactivate monochrome;',  
    'q : Decrease hue;', 'w : Increase hue;', 
    't : Activate/desactivate the global thresholding aplication;', 'a : Decrease threshold value;', 's : Increase threshold value;', 
    'n : Negative effect;','r : Reset image;'];

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