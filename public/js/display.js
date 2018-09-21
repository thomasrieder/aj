var ip = location.host;
var socket = io.connect(ip);

var cvsWidth;
var cvsHeight;
var rap;

$(document).ready(function(){

    socket.emit('hiDisplay');
});

socket.on('welcomeDisplay', function(data){

    rap = $('body').height() / data.height;

    if(data.width * rap > $('body').width()){
      rap = $('body').width() / data.width;
      cvsWidth = $('body').width();
      cvsHeight = data.height * rap;
    }else{
      cvsHeight = $('body').height();
      cvsWidth = data.width * rap;
    }


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

            ctx.moveTo((fx[i-1]/100*cvsWidth), (fy[i-1]/100*cvsHeight));
            console.log(fx[i]/100*cvsWidth);
        }else{

            ctx.moveTo((fx[i]/100*cvsWidth)-1, (fy[i]/100*cvsHeight)-1);
            console.log(fx[i]/100*cvsWidth);
        }
        ctx.lineTo((fx[i]/100*cvsWidth), (fy[i]/100*cvsHeight));
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
