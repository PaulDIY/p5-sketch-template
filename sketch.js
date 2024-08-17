let handPose;
let video;
let hands = [];
let frameWidth = 10;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  //createCanvas(640, 480);
  createCanvas(windowWidth, windowHeight);
  // Create the webcam video and hide it
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
  video = createCapture(videoSettings);
  //video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(150)
  // Draw the webcam video
  image(video, 0, 0, width, width * video.height / video.width);
  // draw red frame
  stroke(255,0,0);
  strokeWeight(frameWidth);
  fill(0,0);
  rect(frameWidth/2, frameWidth/2, width-frameWidth,height-frameWidth);
  
  
  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      let x = map(keypoint.x, 0, video.width, 0, width);
      let y = map(keypoint.y, 0, video.height, 0, height);
      fill(0, 255, 0);
      noStroke();
      circle(x, y, 20);
    }
  }
  
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}
