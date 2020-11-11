

// $(document).ready(function(){
    let shouldTransact = false;
    let counter = 0;
    let amtEarned = 0;
    let preConfidence = [];
    preConfidence.length=90;
    let sampleCount = preConfidence.length;
    
    ethereum.autoRefreshOnNetworkChange = false;
// A Web3Provider wraps a standard Web3 provider, which is
// what Metamask injects as window.ethereum into each page
window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum);


// The Metamask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
const signer = provider.getSigner();
const kio1 = "0xeE801da95f2C111941022cDf72A08938Ce703ECf";
const kio2 = "0xf6Ab8aC61a84b43eEa2c7928bF414089885283d3";
const otherEnt = "0xeD19fE1859B993C719F3e839C9ca14786730b4Ec";

const contractAddress = "0x13851262534F3D9584d0542EFDc0cD27fc785820";
const contractABI = [
  "function name() public view returns (string memory)",
  "function symbol() public view returns (string memory)",
  "function decimals() public view returns (uint8)",
  "function totalSupply() public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function transfer(address recipient, uint256 amount) public returns (bool)",
  "function allowance(address owner, address spender) public view returns (uint256)",
  "function approve(address spender, uint256 amount) public returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) public returns (bool)",
  "function increaseAllowance(address spender, uint256 addedValue) public returns (bool)",
  "function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool)",
  "function reward(uint256 amt) public payable",
  "function mintSomeCoins(uint256 amtMined) public"
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// main();

// async function main() {

 
//   // connect to the signer
//   const tokenWithSigner = contract.connect(signer);
//   console.log("hello");

// //   const amount = ethers.utils.parseUnits("10.0", 18);
//   console.log("amount to send: " + 10);

  
// //   let tx = tokenWithSigner.reward(10);
// }






////p5js
// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/4ISiKLD71/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();

}



// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  let confidence = results[0].confidence;
  if (label== "Distract"){
      confidence = -confidence;
  }
//   let confidence1 =0;
//   let confidence2 =0;
//   confidence1 = confidence;
//   confidence2 = confidence1;
//   let aveConfidence = (confidence + confidence1 +confidence2)/3

    let sum=0;

  for (let i=sampleCount-1; i>=0; i--){

   if (i==0){
       preConfidence[0]=confidence;
   } else{
    preConfidence[i] = preConfidence[i-1];
   }
   sum += preConfidence[i];

  }
//   console.log(preConfidence);

  let aveConfidence = sum/sampleCount;
  if (aveConfidence > 0.8){
      counter++;
  } 
  if (aveConfidence<=-0.99 && counter >= sampleCount){
      shouldTransact = true;
      amtEarned = Math.floor((25/9)*(counter/30));
  }
  if (counter <= sampleCount && label == "Distract"){
      counter = 0;
  }
//   console.log(aveConfidence);
//   console.log(counter);


  if(shouldTransact) {
      // trigger the transaction

    const tokenWithSigner = contract.connect(signer);
     //   const amount = ethers.utils.parseUnits("10.0", 18);
    let mt = tokenWithSigner.mintSomeCoins(amtEarned);
    // let tx = tokenWithSigner.reward(amtEarned);
      shouldTransact = false;
      counter =0;
      
  }

  // Classifiy again!
  classifyVideo();
}




 
//  })
