
//get amplitude working
//different trasnlation varibales
//rotate object, not entire canvasContext
//more sound effects
//change preset patterns'scale array'


//Sound
var freqSlider, ampSlider;
var freqSlider1, ampSlider1;
var freqSlider2, ampSlider2;
var freqSlider3, ampSlider2;
var delayTimeOscSlider,feedBackOscSlider;


var osc, osc1, osc2, osc3, envelope, fft;

var scaleArray = [25, 20, 40, 20, 20, 35, 20, 20];
var scaleArray1 = [26, 21, 21, 22, 21, 23, 22, 22];
var scaleArray2 = [60, 60, 60, 60, 40, 60, 60, 20];
var scaleArray3 = [55, 30, 70, 10, 40, 25, 20, 80];

var delayTimeOsc, feedBackOsc;
var note = 0;

let tearDrops = [];
let step = 60;
var Drops = [];

$(document).ready(function(){
let header = $('header');
let section = $('section');
let valFromUser = "";

$("#getData").click(function(event) {
 console.log("clicked");
 $.getJSON('State.json',function(data) {
   valFromUser=$("#getSearch").val();

   console.log(data);
   console.log(valFromUser);
    })
   })
 })


function preload() {
  tear = loadModel('raindrop.obj');
  drop = loadModel('Drop.obj');

}

function setup() {
  createCanvas(1080,500, WEBGL);

  for(let i = 0; i < 5; i++){
    // let droping = new tearDrops(i*step,0,0,"#FFFFFF");
    tearDrops.push(new tearDrop(i*step,random(0,1000),1));
  }

  for(let i = 0; i < 5; i++){

    Drops.push(new Drop(i*step,random(0,1000),1));
  }

osc = new p5.SinOsc();

envelope = new p5.Env();

freqSlider = createSlider(0, 500, 10);
freqSlider.parent("container");
freqSlider.position(100, 20);

ampSlider = createSlider(0, 100, .5);
ampSlider.parent("container");
ampSlider.position(900, 20);

delayTimeOscSlider = createSlider(0, 99, 1);
delayTimeOscSlider.parent("container");
delayTimeOscSlider.position(0, 100);

feedBackOscSlider = createSlider(0, 99, 1);
feedBackOscSlider.parent("container");
feedBackOscSlider.position(200, 100);

// set attack, Decay, sustainRatio, release
envelope.setADSR(.4, 0.5, 1, 1);
// set attackLevel, releaseLevel
envelope.setRange(.9, 0);

osc.start();

fft = new p5.FFT();
noStroke();
}

function draw() {

  client.on("freqValuesFromServer", function(data){

       console.log("data_1:"+ data.freqVal1);
       //socket.broadcast.emit('freqValuesFromServer', data);
        //console.log("data_2:"+ data.freqVal2);
  });
    background(0,0,0,0.05);
  if(start ===true){

    translate(-width/2,-height/2);

    for(let i = 0; i<tearDrops.length;i++){
      tearDrops[i].display();
      tearDrops[i].update();
    }
    for(var i = 0; i<Drops.length;i++){
      Drops[i].display();
      Drops[i].update();
    }

    if (frameCount % 50 == 0 || frameCount == 1) {
      var midiValue = scaleArray[note];
      var freqValue = midiToFreq(midiValue);
      var freqValue = freqSlider.value();
      delayTimeOsc = delayTimeOscSlider.value()/100;
      feedBackOsc = feedBackOscSlider.value()/100;

      delay = new p5.Delay();
      delay.process(osc, delayTimeOsc, feedBackOsc, 2300);


      let dataPacket = {
        'freqVal1':freqValue,

      }

      client.emit('freqValues', dataPacket);
      var ampValue = ampSlider.value();


      // var ampValue = envelope.setADSR(ampSlider/100, 0.5, 1, 1);
  //     if (mouseIsPressed){
  //         console.log(freqValue);
  //       }
  //       else {
  //   console.log(0);
  // }
      osc.freq(freqValue);
      osc.amp(ampValue/100);
    }
  }
}

function tearDrop(x,y,speed){
  this.tearX = x;
  this.tearY = y;
  this.speed = speed;

  this.display = function(){
    push();
  translate(this.tearX,this.tearY);
    scale(10);
    model(tear);
  pop();
  }
  // this.update = function(){
  //   this.tearY = this.tearY+this.speed;
  // }
  this.update = function(){
      if(this.tearY>canvas.height){
      this.tearY=0;
    }
    else {
      this.tearY = this.tearY+this.speed;
    }

    }
}

function Drop(x,y,speed){
  this.dropX = x;
  this.dropY = y;
  this.speed = speed;

  this.display = function(){
    push();
  translate(this.dropX,this.dropY);
    scale(10);
    //background(0,0,0,0.05);
    model(drop);
  pop();
  }

  // this.update = function(){
  //   this.dropY = this.dropY+this.speed;
  //
  // }
  this.update = function(){
      if(this.dropY>canvas.height){
      this.dropY=0;
    }
    else {
      this.dropY = this.dropY+this.speed;
    }

    }

}
