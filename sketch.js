
// ==== variables ====


function mousePressed() {
  console.log("Mouse Pressed");
  
}


//  ==== setup ====



function setup() {
  createCanvas(640, 480);
  //createCanvas(windowWidth, windowHeight);
  /*
  var videoSettings = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    },    
    //video: {
      //facingMode: "user"
    //}, 
    flipped: false,
  };
  */
  
}


// ==== DRAW ====

function draw() {
  background(0);

  fill(127)
  circle(320,480,50)
  
}

// ==== STUFF ====
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




