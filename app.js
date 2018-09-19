var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require('fs');
var path = require('path');


server.listen(80);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/user.html'));

})
.get('/adminbadass', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/admin.html'));

})
.get('/display', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/display.html'));

})
.get('/draw', function(req, res){
    
    res.sendFile(path.join(__dirname+'/public/pages/draw.html'));

})
.use(function(req, res, next){
    
});


/**
 * STEP:
 * 0 -> null
 * 1 -> Lui/Elle
 */
var currentStep = 1;
var sDraw;
var cvsWidth;
var cvsHeight;
var sDisp;

io.on('connection', function(socket){
    

    socket.emit('welcome', currentStep);

    socket.on('setStep', function(vTime){
        
        //socket.broadcast.emit('updateVideo', vTime);
    });

    socket.on('getStep', function(vTime){
        
        socket.emit('setUser', currentStep);
    });
    
    socket.on('hiDraw', function(data){
        
        cvsWidth = data.width;
        cvsHeight = data.height;

        sDraw = socket;
        sDraw.emit('welcomeDraw');
    });
    
    socket.on('hiDisplay', function(){
            
        sDisp = socket;
        sDisp.emit('welcomeDisplay', {width: cvsWidth, height: cvsHeight});
    });

    socket.on('cvsDraw', function(data){

        sDisp.emit('drawDisplay', data);
    });
});