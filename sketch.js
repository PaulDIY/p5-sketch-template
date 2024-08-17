
// ==== variables ====

let video;
let faceMesh;
let faces = [];
let bodyPose;
let poses = [];
let connections;
let bodySegmentation;
let segmentation;
let handPose;
let hands = [];


function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 2, flipped: false });
  bodyPose = ml5.bodyPose({flipped: false });
  bodySegmentation = ml5.bodySegmentation("BodyPix", {maskType: "parts",});
  handPose = ml5.handPose();
}


// ==== functions ====

function gotFaces(results) {
  //console.log(results);
  faces = results;
}
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
function gotSegmentation(result) {
  segmentation = result;
}
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}


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
  
  video = createCapture(VIDEO, videoSettings);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
  //bodySegmentation.detectStart(video, gotSegmentation);
  handPose.detectStart(video, gotHands);
  
  console.log(ml5.version);
  
}


// ==== DRAW ====

function draw() {
  background(0);
  image(video, 0, 0, width, height);
  /*
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
  */
  
  drawPoses()
  
  for (let f of faces) {
    drawPart(f.leftEye, "orange")
    drawPart(f.rightEye, "green")
    drawPart(f.leftEyebrow, "magenta")
    drawPart(f.rightEyebrow, "cyan")
    drawPart(f.lips, "blue")
    drawPart(f.faceOval, "white")
  }
  
  drawHands()
  
}

// ==== STUFF ====
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function drawPart(part, col) {
  for (let keyP of part.keypoints) {
      strokeWeight(2);
      stroke(col);
      point(keyP.x, keyP.y);
      
    }
}

function drawPoses() {
  //draw the skeleton connections
  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  // Draw all the tracked landmark points
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

drawHands = function() {
  
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
  
}
  
  

