var ip = location.host;
var socket = io.connect(ip);

var cvsWidth;
var cvsHeight;

$(document).ready(function(){
    
    socket.emit('hiDisplay');
});

socket.on('welcomeDisplay', function(data){

    cvsWidth = data.width;
    cvsHeight = data.height;
    
    setCanvas();
});

function setCanvas(){
    
    //get canvas
    var cvs = $('#cvs').get(0);

    //set size of canvas
    cvs.width = cvsWidth;
    cvs.height = cvsHeight;
}

function draw(ctx, fx, fy){
    
    ctx.strokeStyle = color;
    
    if(color == "rgb(0, 0, 0)"){
        
        ctx.lineWidth = 15;
    }else{

        ctx.lineWidth = 5;
    }
    

    for(var i = 0; i < fx.length; i++){
        
        ctx.beginPath();    

        if(i){
            
            ctx.moveTo(fx[i-1], fy[i-1]);
        }else{

            ctx.moveTo(fx[i]-1, fy[i]-1);
        }

        ctx.lineTo(fx[i], fy[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

socket.on('drawDisplay', function(data){

    var cvs = $('#cvs').get(0);
    var ctx = cvs.getContext('2d');
    
    color = data.cvsColor;
    
    draw(ctx, data.cvsX, data.cvsY);
});