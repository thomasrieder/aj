var ip = location.host;
var socket = io.connect(ip);

var currentStep;

//update the interface to the current step
socket.on('welcome', function(servStep){

    currentStep = servStep;
    
    setPage();
});

$(document).ready(function(){

    //disable scroll refresh
    $('.page').on('touchmove', function(e){

        e.preventDefault();
    });
    
    $('.btn-le').on('touchstart click', function(){
        
        userHasChose($(this));
    });
});

function setPage(){

    if(currentStep == 1){

        $('.page-welcome').css({
            'display': 'none'
        });
        $('.page-lui-elle').css({
            'display': 'block'
        });
    }
}


function userHasChose(btnChoosed){

    var choice = btnChoosed.attr('opt');
    
    if(choice == 'lui'){
        
        $('.lui-btn').css({
            'height': '100%'
        });

        $('.elle-btn').css({
            'height': '0'
        });

        $('.elle-btn').children().css('opacity', '0');

    }else if(choice == 'elle'){
        
        $('.lui-btn').css({
            'height': '0'
        });

        $('.elle-btn').css({
            'height': '100%'
        });

        $('.lui-btn').children().css('opacity', '0');
    }
}