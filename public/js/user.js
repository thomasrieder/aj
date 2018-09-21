var ip = location.host;
var socket = io.connect(ip);

var currentStep;
var isClicked = 0;

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
      if(isClicked == 0){
        userHasChose($(this));
      }
    });

    $('.close-btn').on('touchstart click', function(){

      if(isClicked == 1){
          resetInterface();
      }
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
    isClicked = 1;

    $('.close-btn').css('opacity', '0.7');

    if(choice == 'lui'){

        $('.lui-btn').css({
            'height': '100%',
            'background-size': '250px'
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
            'height': '100%',
            'background-size': '250px'
        });

        $('.lui-btn').children().css('opacity', '0');
    }
}

function resetInterface(){

  isClicked = 0;

  $('.close-btn').css('opacity', '0');

  $('.lui-btn').css({
      'height': '50%',
      'background-size': '100px'
  });

  $('.elle-btn').css({
      'height': '50%',
      'background-size': '100px'
  });
  $('.lui-btn').children().css('opacity', '1');
  $('.elle-btn').children().css('opacity', '1');
}
