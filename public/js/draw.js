var ip = location.host;
var socket = io.connect(ip);
var color = "white";


$(document).ready(function(){

    //disable scroll refresh
    $('.page').on('touchmove', function(e){

        e.preventDefault();
    });

    var drawWidth = $('.page-draw').width();
    var drawHeight = $('.page-draw').height();

    socket.emit('hiDraw', {width: drawWidth, height: drawHeight});
    
    setCanvas();
    touchMove();
});

socket.on('welcomeDraw', function(){
    
});


$('.color-btn').on('touchstart click', function(){
    
    color = $(this).css('background-color');
});

function setCanvas(){

    //get canvas
    var cvs = $('#cvs').get(0);

    //set size of canvas
    cvs.width = $('.page-draw').width();
    cvs.height = $('.page-draw').height();
}

 
function touchMove(){
    
    var fx =[];
    var fy =[];
    var cvs = $('#cvs').get(0);
    var ctx = cvs.getContext('2d');
    
    ctx.lineJoin = "round";

    var cvsLeft = $('#cvs').position().left;
    var cvsTop = $('#cvs').position().top;

    $('#cvs').on('touchstart touchmove', function(e){
        
        fx.push(e.touches[0].pageX - cvsLeft);
        fy.push(e.touches[0].pageY - cvsTop);
        
        draw(ctx, fx, fy);
    });

    $('#cvs').on('touchend', function(){
        
        fx = [];
        fy = [];
    });
    
    $('.remove-button').click(function(){
        
        clearctx(ctx);
    });

    $('.send-button').click(function(){
        
        var imgSend = cvs.toDataURL('image/png');

        var width = $(document).width();
        var height = $(document).height();
        
        
        socket.emit('sendImage', {img: imgSend, w: width, h: height});
        
        //clearctx(ctx);
        sendFeedback();
    });
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

    socket.emit('cvsDraw', {cvsX: fx, cvsY: fy, cvsColor: color});
}