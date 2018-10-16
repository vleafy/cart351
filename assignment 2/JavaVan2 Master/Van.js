var mic;

var cols, rows;
    var scl = 30;
    // var w = windowWidth;
    var h = 9000;

    var flying = 1;
    var terrain;

    function setup() {

      createCanvas(windowWidth, windowHeight, WEBGL);
      mic = new p5.AudioIn();
      mic.start();
      fft = new p5.FFT();
      fft.setInput(mic);
      cols = windowWidth *1.0/ scl;
      rows = h/ scl;

			terrain = [];
      for (var x = 0; x < cols; x++) {
        terrain[x] = [];
      }

    }

    function draw() {

      var vol = mic.getLevel();
      var mastervol = (100+vol*10000)
      console.log(vol)

      flying -= .1;
      var yoff = flying;
      for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
          terrain[x][y] = map(noise(xoff, yoff), 0, 1, 15, mastervol);
          xoff += 0.1;
        }
        yoff += 0.1;
      }

      background(0,0,0,0.05);
      translate(0, 10);
      rotateX(-PI/2);
      translate(-windowWidth*.65, -h/4);

      for (var y = 0; y < rows-1; y++) {

        beginShape(TRIANGLE_STRIP);
        fill(0);
        stroke(255);

        for (var x = 0; x < cols; x++) {

          push();
          translate(x*scl, y*scl, terrain[x][y]);
          vertex(x*scl, y*scl, terrain[x][y]);
          vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
          pop();


        }
        endShape();

      }

    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight);
    }
