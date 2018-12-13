
document.getElementById("Stop").addEventListener("click", stopFunction);
document.getElementById("Play").addEventListener("click", playFunction);
document.getElementById("More").addEventListener("click", moreFunction);

    var lfo;
    var hfo;
    var o = null;
    var g = null;
    var lowpassFilter = 0;
    var dry = 0;
    var wet = 0;
    var scaleArray = [55, 60, 60, 60, 70, 85, 40, 50];
    var note = 0;
    var context = new AudioContext();


  function setup() {
        // alert ("Hello World!");
        createCanvas(1080,800, WEBGL);

    lfo = context.createOscillator();
    lfo.frequency.value = 1.0;
    hfo = context.createOscillator();
    hfo.frequency.value = 140.0;

  var modulationGain = context.createGain();
    modulationGain.gain.value = 50;
    lfo.connect(modulationGain);
    modulationGain.connect(hfo.detune);
    hfo.connect(context.destination);

    }
function myFunction(){}
    function draw(){
      if(frameCount%30 ===0){
        var midiValue = scaleArray[note];
      hfo.frequency.value = midiToFreq(midiValue);
      console.log(lfo.frequency.value)
      }
    }

    function moreFunction(){
      o = context.createOscillator();
      o.frequency.value = 140.0;
      g = context.createGain();
      // var lowpassFilter = context.createBiquadFilter();
      var reverb = context.createConvolver();
      // var wet = context.createGain();


      // lowpassFilter.connect(o);
      reverb.connect(o);
      // wet.connect(o);
      o.connect(g)
      o.connect(context.destination);

      g.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + 100
)
        o.start(0);

    }

    function playFunction() {
      hfo.start(0);
      lfo.start(0);
      }

    function stopFunction() {
      hfo.stop(0);
      lfo.stop(0);
      }
