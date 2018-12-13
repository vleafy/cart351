//import the Express library
let express = require('express');
const portNumber =4200;
let app = express(); //make an insatnce of express
let httpServer = require('http').createServer(app);  // create a server (using the Express framework object)

// make server listen for incoming messages
httpServer.listen(portNumber, function(){
  console.log('listening on port:: '+portNumber);
});

// serving static files
let static = require('node-static'); // for serving static files (i.e. css,js,html...)
// serve anything from this dir ...
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


// declare io which mounts to our httpServer object (runs ontop ... )
let io = require('socket.io')(httpServer);
// for the client...
app.use(express.static(__dirname + '/node_modules'));

// Listen for incoming connections from clients
io.on('connection', function (socket) {

     socket.on('join', function (data) {
     console.log("client joined:: "+ data);
    });

    socket.on("freqValues", function(data){

         console.log("data_1:"+ data.freqVal1);
         socket.broadcast.emit('freqValuesFromServer', data);
          //console.log("data_2:"+ data.freqVal2);
    });
});
