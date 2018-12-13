
document.getElementById("Pusha").addEventListener("click", myFunction);
// document.getElementById("Pushb").addEventListener("click", moreFunction);
document.getElementById ("Pushc").addEventListener("click", stopFunction);


var context = new AudioContext()

var o = null
var g = null
var osc = null
var vol;
var frequency = 400
var freqSlider;
var freqSlider2;
var freqValue;

var note = 0;
//let img;




let tearDrops = [];
let step = 120;
//var Drops = [];

function preload() {
  tear = loadModel('raindrop.obj');
  //img = loadImage("Assets/Water.jpg");
  //drop = loadModel('raindrop.obj');
  //metal = loadImage('metal.jpg')

}

function setup() {
  createCanvas(1980,1000, WEBGL);

  osc = context.createOscillator()
  vol = context.createGain()
  osc.type = "sine"

  freqSlider = createSlider(0, 800, 10);
  freqSlider.parent("container");
  freqSlider.position(100, 0);

  freqSlider2 = createSlider(0, 800, 10);
  freqSlider2.parent("container");
  freqSlider2.position(1300, 0);

  osc.start(0)

  for(let i = 0; i < 10; i++){
    // let droping = new tearDrops(i*step,0,0,"#FFFFFF");
    tearDrops.push(new tearDrop(i*step,random(-1500,-50),random(1,4),freqSlider));
    //tearDrops.push(new tearDrop(1*step,random(500,1500),1,freqSlider2));
 }

  // for(let i = 0; i < 10; i++){
  //
  //   Drops.push(new Drop(i*step,random(400,1000),1));
  // }
}

function draw() {

  ambientLight(60, 60, 60);
  pointLight(255, 255, 255, 50, 150, 100);

  // client.on("freqValuesFromServer", function(data){
  //
  //      console.log("data_1:"+ data.freqVal1);
  //      freqSlider.value(data.freqVal1);
  //      //socket.broadcast.emit('freqValuesFromServer', data);
  //       //console.log("data_2:"+ data.freqVal2);
  // });

  background(0,0,0,0.05);
  if(start ===true){

    translate(-width/2,-height/2);

    for(let i = 0; i<tearDrops.length;i++){
      tearDrops[i].display();
      tearDrops[i].update();
    }

     //  let dataPacket = {
     //    'freqVal1':freqValue,
     //
     //  }
     // console.log(dataPacket);
     //  if(freqValue!="undefined"){
     //  client.emit('freqValues', dataPacket);
     // }
    //   osc.connect(vol)
    //   osc.frequency.value = 400;
    //   vol.connect(context.destination)
    //     vol.gain.exponentialRampToValueAtTime(
    //       0.00001, context.currentTime + 10
    //         )
    // }
  }
}

function mousePressed(){
  for(let i =0;i<tearDrops.length;i++){
    let result = tearDrops[i].collisionDetect();
    if(result ===false){}
  }
  var hide = document.getElementById("container");
  if (hide.style.display === "none") {
    hide.style.display = "block";
  } else {
    hide.style.display = "none";
  }

}

function tearDrop(x,y,speed, slider1){
  this.tearX = x;
  this.tearY = y;
  this.speed = speed;
  this.stopped =false;
  this.cOsc_1 =null;
  this.initialScale = 60;


 this.collisionDetect = function(){
   let d = dist(this.tearX+120,this.tearY,mouseX,mouseY);
   if(d <120) {
     if(this.stopped ===false){
       this.cOsc_1 = new CustomOscillator(slider1);
     }
     console.log("collision");
     this.stopped=!this.stopped;
     return true;
   }
   //stopFunction();
   return false;
 }

  this.display = function(){
  push();
  translate(this.tearX,this.tearY);
  rotateX(radians(180));
  scale(this.initialScale);

  ambientMaterial(250);
  model(tear);
  pop();

//   push();
//   translate(this.tearX+120,this.tearY);
// //rotateX(radians(180));
//   scale(60);
//   box(1);
//
// pop();
  }

  this.update = function(){
    if(this.stopped ===false){


      if(this.tearY>canvas.height){
      this.tearY=0;

    }
    else {
      this.tearY = this.tearY+this.speed;
    }
  }
  else{
    this.initialScale = 100;
  }
}
}


function CustomOscillator(freqSlider){

  // var midiValue = scaleArray[note];
    this.freqSlider = freqSlider;
    this.o = context.createOscillator()
    this.g = context.createGain()
    this.o.type = "sine";
    this.o.connect(this.g)
    this.o.frequency.value = this.freqSlider.value();
    this.g.connect(context.destination)
    this.o.start(0)

    this.g.gain.exponentialRampToValueAtTime(
      0.00001, context.currentTime + 100)
    }



function myFunction() {

    alert ("Hello new User!");
    freqValue = freqSlider.value();
    console.log(freqValue);


    // var midiValue = scaleArray[note];
    o = context.createOscillator()
      g = context.createGain()
      o.type = "sine"
      o.connect(g)
      o.frequency.value = freqValue
      g.connect(context.destination)
      o.start(0)

      g.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + 100
      )
    }



  function stopFunction() {

      o.stop(0)
      o1.stop(0)

    }
