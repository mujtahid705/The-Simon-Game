var buttonColors = ["red", "blue", "green", "yellow"];


var gamePattern = [];


var userClickedPattern = [];

var started = false;
var level = 0;


function nextSequence() {
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML = "Level:" + level;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
}

function playSound(name) {
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");;
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

    playSound(userChosenColor);
    animatePress(userChosenColor);
});


function animatePress(currentColor) {
    $("#" + currentColor).toggleClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).toggleClass("pressed");
    }, 100);
}


document.addEventListener("keydown", function () {
    if(started === false) {
        nextSequence();
        started = true;
        document.querySelector("#level-title").innerHTML = "Level:" + level;
    };
    
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("Success");
     
        if (gamePattern.length === userClickedPattern.length) {
          setTimeout(() => {
            nextSequence();
          }, 1000);
        }
     
      } else {
        console.log("Wrong");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();

        document.querySelector("body").classList.toggle("game-over");
        setTimeout(() => {
            document.querySelector("body").classList.toggle("game-over");
        }, 200);

        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";
        startOver();
      }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

