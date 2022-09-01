// DATE STARTED: AUGUST 28, 2022
// FINISHED: SEPTEMBER 1, 2022

var buttonColours = ["red","green","yellow","blue"];
var userClickedPattern = [];
var gamePattern=[];

var gameLevel = 0;

function nextSequence(){
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    simonSound(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);
    animatePress(randomChosenColour);
    $("h3").text("Level: " + gameLevel);
    
}

var currentLevel = 0;
$(".box").on("click", function(){
    var color = $(this).attr('id')
    $(this).fadeOut(50).fadeIn(50);
    simonSound(color);
    userClickedPattern.push(color);
    animatePress(color);
    answerChecker(userClickedPattern.length-1);
    
});

$("#theme").on("click", function(){
    // Dark Mode Configuration
    if ($("#theme").hasClass("fa-moon")){
        $("#theme").addClass("fa-sun");
        $("#theme").removeClass("fa-moon");
        document.documentElement.style.setProperty('--background-color-dark', '#222831');
        document.documentElement.style.setProperty('--primary-text-color', '#eeeeee');
        document.documentElement.style.setProperty('--secondary-text-color', '#00adb5');
        $("footer").css("color","rgb(183, 183, 183)");
        $("#theme").css("color","white");
        $(".red").css("background-color","rgb(188, 7, 7)");
        $(".green").css("background-color","rgb(3, 91, 3)");
        $(".yellow").css("background-color","rgb(150, 150, 9)");
        $(".blue").css("background-color","rgb(33, 33, 123");

    }
    // Light Mode Configuration
    else{
        $("#theme").removeClass("fa-sun");
        $("#theme").addClass("fa-moon");
        document.documentElement.style.setProperty('--background-color-dark', '#d2d2d2');
        document.documentElement.style.setProperty('--primary-text-color', '#000000');
        document.documentElement.style.setProperty('--secondary-text-color', '#086e9a');
        $("footer").css("color","black");
        $("#theme").css("color","black");
        $(".red").css("background-color","rgb(227, 10, 10)");
        $(".green").css("background-color","rgb(7, 190, 7)");
        $(".yellow").css("background-color","rgb(202, 202, 8)");
        $(".blue").css("background-color","rgb(31, 31, 184)");
    }
});

var gameStatus = "idle";
$(document).on("keypress", function(){
    if (gameStatus == "idle"){
        nextSequence();
        gameStatus = "started";
        $("h2").text("Simon Says....");
    }
    
});


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 150);
  }

function simonSound(color){
    var soundName = new Audio("sounds/" + color + ".mp3");
    soundName.play();
}

function answerChecker(level){
        if(userClickedPattern[level] == gamePattern[level]){
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
                  nextSequence();
                }, 800);
                userClickedPattern =[];
                $("h3").text("Level: " + gameLevel);
                gameLevel++;
              }
        }
        else{
            gameReset();
        }
}

function gameReset(){
    var soundName = new Audio("sounds/wrong.mp3");
    soundName.play();
    userClickedPattern = [];
    gamePattern=[];
    gameLevel = 0;
    currentLevel = 0;
    gameStatus = "idle";
    $("h2").text("WRONG!");
    $("h3").text("Level: " + gameLevel);
    $("body").addClass("error");
    setTimeout(function () {
        $("body").removeClass("error");
      }, 1000);

      setTimeout(function () {
        $("h2").text("PRESS ANY KEY TO START");
      }, 1000);
}
