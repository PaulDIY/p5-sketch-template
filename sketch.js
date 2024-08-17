let handPose;
let video;
let hands = [];
let frameWidth = 10;
let skeleton = [
  [0,1], [1,5], [5,9], [9,13], [13,17], [17,0],    // area
  [1,2], [2,3], [3,4], // thumb
  [5,6], [6,7], [7,8], // index
  [9,10],  [10,11], [11,12],  // middle
  [13,14], [14,15], [15,16],  // ring
  [17,18], [18,19], [19,20],  // pinky
  
];
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
    for ( let edge of skeleton ) {
      let x1 = map( hand.keypoints[edge[0]].x, 0, video.width,  0, width );
      let y1 = map( hand.keypoints[edge[0]].y, 0, video.height, 0, height);
      let x2 = map( hand.keypoints[edge[1]].x, 0, video.width,  0, width );
      let y2 = map( hand.keypoints[edge[1]].y, 0, video.height, 0, height);
      fill(0, 0);
      stroke(0,255,0);
      strokeWeight(10);
      line(x1, y1, x2, y2);
      
    };
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      let x = map(keypoint.x, 0, video.width, 0, width);
      let y = map(keypoint.y, 0, video.height, 0, height);
      fill(255, 0, 0);
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
