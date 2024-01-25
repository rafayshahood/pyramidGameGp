//array to store location of each confetti
var confLocs = [];
//array to store angle of each confetti
var confTheta = [];

//variable to control speed of cubes
var speed = 5;
//create speed Slider
var speedSlider;
//variable to control height of cubes
var boxHeight = 2;
//create box height Slider
var boxHeightSlider;

function setup() {
    createCanvas(900, 800, WEBGL);

    //for loop to fill confLocs and conTheta arrays
    for (var i = 0; i < 200; i++) {
        var xPos = random(-500, 500);
        var yPos = random(-800, 0);
        var zPos = random(-500, 500);

        //Pushing values in confLocs array
        var vect = createVector(xPos, yPos, zPos);
        confLocs.push(vect);
        //Pushing values in confTheta array        
        var angle = random(0, 360);
        confTheta.push(angle);
        
        //initializing speedSlider
        speedSlider = createSlider(0,10,5,2);
        speedSlider.position(30,30);
        
        //initializing boxHeightSlider        
        boxHeightSlider = createSlider(1,5,2);
        boxHeightSlider.position(700,30);       
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);

    //To rotate the camera
    var camRotX = cos(frameCount) * (height + 400)
    var camRotZ = sin(frameCount) * (height + 400)
    camera(camRotX, -800, camRotZ, 0, 0, 0, 0, 1, 0);

    //To normalize the material
    //normalMaterial();

    //stroke(0);
    //strokeWeight(2);    
   
    //value from sliders given to designated variables    
    speed = speedSlider.value();
    boxHeight = boxHeightSlider.value();
    
    
    push();
    // white material
    ambientMaterial(255);
    //move your mouse to change light direction
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    pointLight(255, 0, 255, -dirX, -dirY, -1);

    //Nested for loop to create boxes
    for (var x = -400; x <= 400; x += 50) {

        for (var z = -400; z <= 400; z += 50) {
            push();

            distance = dist(x, z, 0, 0);
            //speed variable used in sin function to alter the speed of the cubes according to the value from speed Slider           
            length = map(sin(distance + frameCount* speed) , -1, 1, 100, 300);

            translate(x, 0, z);
            //boxHeight multiplied by length at the y coordinate so the height of boxes are adjusted by slider
            box(50, length * boxHeight/2, 50);
            pop();
        }
    }
    pop();

    //call the confetti function
    confetti()
}

function confetti() {
    for (var i = 0; i < confLocs.length; i++){
        push();
        //To normalize the material
        normalMaterial();
        
        stroke(0);
        strokeWeight(2);
        translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
        rotateX(confTheta[i]);
        rotateY(confTheta[i]);
        rotateZ(confTheta[i]);
        plane(15, 15);

        //Incremeneting y coordinate to make confetti travel down
        confLocs[i].y += 1;
        //Incremeneting angle for spining the confetti        
        confTheta[i] = confTheta[i] + 10;

        //if y coordinate of confetti reaches specific value make them start from top
        if (confLocs[i].y > 0) {
            confLocs[i].y = -800;
        }
        pop();
    }
}
