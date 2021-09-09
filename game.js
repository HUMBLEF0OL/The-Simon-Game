
var buttonColours = ["red", "blue", "green", "yellow"];
// an array for storing the system input
var gamePattern = [];

// an array for storing the user input
var userClickedPattern = [];

// a variable for maintaining the level
var level = 0;
// a starter variable
var started = false;

// initializing the game on keypress
$(document).keypress(function () {
    if (started == false) {
        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".

        $('#level-title').html("Level " + level);
        nextSequence();
        started = true;
    }

});

// working on user end( when user press the button)
$('.btn').click(function () {
    // fetching the pressed button id
    var userChosenColour = $(this).attr("id");
    // pushing it into the user array
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    // now check whether the user have entered the correct answer or not
    // everytime we go for mathcing the input just check whether the last input matches or not!
    checkAnswer(userClickedPattern.length - 1);
});


// creating a function to check whether the user have entered the correct sequence or not
function checkAnswer(currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        // if we have successfully enter the whole pattern correctly then generate a new pattern
        if (userClickedPattern.length === gamePattern.length) {
            // moving on to next sequence
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        // now we have to play wrong sound!
        playSound("wrong");
        // now adding the effect of wrong answer by adding a game-over class
        $("body").addClass('game-over');
        // updating the title now
        $('#level-title').html("Game Over, Press Any Key to Restart");

        // after 200ms removing the game-over class
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200);

        // restarting the game
        startOver();
    }
}

function nextSequence() {
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    // increasing the level everytime when the nextSequence is called
    level++;
    $('#level-title').html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // adding the flash effect for the next input
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    // playing the required sound
    playSound(randomChosenColour);

}

// adding animation effect on pressing the key
function animatePress(currentColor) {
    $("#" + currentColor).addClass('pressed');
    setTimeout(() => {
        $("#" + currentColor).removeClass('pressed');
    }, 100);
}

// creating a play sound function
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// creating a startOver() function
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}


