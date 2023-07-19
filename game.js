//alert("working");
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {

  if (!started) {

    $("h1").text("Level " + level);
    nextsequence();
    started = true;
  }
});






$(".btn").click(function () {

  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePressed(userChosenColour);

  console.log(gamePattern);
  console.log(userClickedPattern);

  checkAnswer(userClickedPattern.length - 1);


});




function nextsequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomnumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);




}
function playSound(name) {
  var audio = new Audio(name + '.mp3');
  audio.play();

}


function animatePressed(currentColour) {

  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Sucess");



    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextsequence();
      }, 1000);

    }


  }
  else {
    console.log("Wrong");
    var audio = new Audio('wrong.mp3');
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart ");
    start_over();
  }

}
function start_over() {
  started = false;
  gamePattern = [];
  level = 0;
}