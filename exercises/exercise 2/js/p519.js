// max number ellipses
const MAX_ELLIPSES =5;
//array to hold objects
let myEllipses = [];
//make some possible colors
let colors = ["#8ED6FF","#c379e5","#e22626","#61f495","#4953c1","#ffb807","#ffc907"];

function setup() {
  // put setup code here
  createCanvas(640, 480);
  background(0);

  //fill the array with objects
  for (let i =0; i< MAX_ELLIPSES;i++){
    console.log(myEllipses.length);
  // have different parameters for each ellipse object
  let objW = 40;
  let offsetX =10;
  //is width and not canvas width
  myEllipses.push(new myRunningEllipse((i*(objW+offsetX))+width/2,height/2,objW/2,colors[i%colors.length],(i%5)+1,(i%6)+2,i));
  }
}

function draw() {
  // put drawing code here
  background(0);
  for(let i=0; i< myEllipses.length;i++){
   myEllipses[i].render();
   myEllipses[i].update();
 }

}
function mousePressed(){
  console.log('canvas mousedown');
  for (let i =0; i< myEllipses.length;i++){
    // test if is over an ellipse
    myEllipses[i].hitTestDown(event);
  }
}

function mouseMoved(){
  console.log('canvas mouseover');
  for (let i =0; i< myEllipses.length;i++){
    // test if is over an ellipse
    myEllipses[i].hitTestOver(event);
  }

}

function myRunningEllipse(x,y,r,c,xSpeed,ySpeed,tempId){
  //member variables
  this.xPos = x;
  this.yPos = y;
  this.radius = r;
  this.ellipseColor = c;

  // new for updating
  this.xSpeed = xSpeed;
  this.ySpeed =ySpeed;
  this.ellipseID = tempId;

//member function -> all thats changed is rendering...
  this.render =function(){
     fill(this.ellipseColor);
      ellipse(this.xPos,this.yPos,this.radius,this.radius);
    }
  //member function for updating
  this.update = function(){
       if(this.xPos<0 || this.xPos>width){
         this.xSpeed*=-1;
       }
       if(this.yPos<0 || this.yPos>height){
         this.ySpeed*=-1;
       }
       this.xPos+=this.xSpeed;
       this.yPos+=this.ySpeed;
     }

     //hit test down
     this.hitTestDown =function(event){
       //use distance formula
       if(Math.sqrt(Math.pow((event.clientX-this.xPos),2) + Math.pow((event.clientY - this.yPos),2))< this.radius){
         console.log(`ellipse ${this.ellipseID} was pressed`);
       }
     }

     //hit test over
     this.hitTestOver =function(event){
       //use distance formula
       if(Math.sqrt(Math.pow((event.clientX-this.xPos),2) + Math.pow((event.clientY - this.yPos),2))< this.radius){
         console.log(`ellipse ${this.ellipseID} has mouse over`);
       }
     }
  } //end myRunningEllipse
