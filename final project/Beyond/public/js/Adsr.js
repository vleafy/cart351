
var freqSlider, ampSlider;
var freqSlider1, ampSlider1;
var freqSlider2, ampSlider2;
var freqSlider3, ampSlider2;

var osc, osc1, osc2, osc3, envelope, fft;

var scaleArray = [25, 20, 40, 20, 20, 35, 20, 20];
var scaleArray1 = [26, 21, 21, 22, 21, 23, 22, 22];
var scaleArray2 = [60, 60, 60, 60, 40, 60, 60, 20];
var scaleArray3 = [55, 30, 70, 10, 40, 25, 20, 80];


var note = 0;

function setup() {
  createCanvas(1920, 1080);
  osc = new p5.SinOsc();
  osc1 = new p5.TriOsc();
  osc2 = new p5.SinOsc();
  osc3 = new p5.TriOsc();

  envelope = new p5.Env();

  freqSlider = createSlider(0, 500, 10);
  freqSlider.parent("container");
  freqSlider.position(100, 20);

  freqSlider1 = createSlider(0, 500, 10);
  freqSlider1.parent("container");
  freqSlider1.position(300, 20);

  freqSlider2 = createSlider(0, 500, 10);
  freqSlider2.parent("container");
  freqSlider2.position(500, 20);

  freqSlider3 = createSlider(0, 500, 10);
  freqSlider3.parent("container");
  freqSlider3.position(700, 20);

  ampSlider = createSlider(0, 100, 50);
  ampSlider.parent("container");
  ampSlider.position(900, 20);

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(.4, 0.5, 1, 1);

  // set attackLevel, releaseLevel
  envelope.setRange(5, 0);



  osc.start();
  osc1.start();
  osc2.start();
  osc3.start();

  osc.amp(envelope);
  osc1.amp(envelope);
  osc2.amp(envelope);
  osc3.amp(envelope);

  fft = new p5.FFT();
  noStroke();
}

function draw() {
  background(20);

  if (frameCount % 50 == 0 || frameCount == 1) {
    var midiValue = scaleArray[note];
    var freqValue = midiToFreq(midiValue);
    var freqValue = freqSlider.value();
    var ampValue = ampSlider.value();
    // var ampValue = envelope.setADSR(ampSlider/100, 0.5, 1, 1);

    console.log(ampValue);
    osc.freq(freqValue);

    //osc.amp(ampValue);

    // if (frameCount % 50 == 0 || frameCount == 1) {
    //   var midiValue1 = scaleArray1[note];
    //   var freqValue1 = midiToFreq(midiValue1);
    //   var freqValue1= freqSlider1.value();
    //   osc1.amp(.4);
    //   osc1.freq(freqValue1);

    var freqValue1= freqSlider1.value();
    //var ampValue = ampSlider.value();
    osc1.freq(freqValue1);
    osc1.amp(ampValue/100.0);

    var freqValue2= freqSlider2.value();
    //var ampValue = ampSlider.value();
    osc2.freq(freqValue2);
    osc2.amp(ampValue/100.0);

    var freqValue3= freqSlider3.value();
    //var ampValue = ampSlider.value();
    osc2.freq(freqValue3);
    osc2.amp(ampValue/100.0);




    //reverb.amp(.1);


   envelope.play(osc, 0, 0.1);
    note = (note + 1) % scaleArray.length;
    envelope.play(osc1, 0, 0.1);
    note = (note + 1) % scaleArray1.length;
    envelope.play(osc2, 0, 0.1);
    note = (note + 2) % scaleArray1.length;



  }
}
