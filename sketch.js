
// ==== variables ====


function mousePressed() {
  console.log("Faces:");
  console.log(faces);
  console.log("Poses:");
  console.log(poses);
  console.log("Segmentation:");
  console.log(segmentation);
  
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

  circle(0,0,50)
  
}

// ==== STUFF ====
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




