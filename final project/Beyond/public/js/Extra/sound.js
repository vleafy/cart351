
// var context = new AudioContext()
// var o = context.createOscillator()
// o.type = "sine"
// o.connect(context.destination)
// o.start()
//


document.getElementById("Play").addEventListener("click", myFunction);
document.getElementById("Stop").addEventListener("click", stopFunction);

var context = new AudioContext()
var osc = null
var vca = null
var frequency = 400
var freqSlider, ampSlider;



function myFunction() {
    alert ("Hello World!");

    osc = context.createOscillator()
      vca = context.createGain()
      osc.type = "sine"
      osc.connect(g)
      osc.frequency.value = frequency
      vca.connect(context.destination)
      osc.start(0)

      vca.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + 100
      )
    }

    function stopFunction() {
        alert ("Stop World!");

        osc = context.createOscillator()
          vca = context.createGain()
          osc.type = "sine"
          osc.connect(g)
          osc.frequency.value = 300
          vca.connect(context.destination)
          osc.start(0)

          vca.gain.exponentialRampToValueAtTime(
            0.00001, context.currentTime + 100
          )
        }
