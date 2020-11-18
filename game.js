let buttonColors = ["red", "yellow", "green", "blue"];
let gamePattern = [];
let userClickedPattern = []
let started = false
let level = 0

$(document).keydown(function(){
  if (!started) {
    $("#level-title").text('Level ' + level)
    $("p").text('')
    nextSequence()
    started = true
  }
})

$(".btn").click(function(){
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor)
  // console.log(userClickedPattern)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern.length-1)
})

function nextSequence () {
  userClickedPattern = []
  level++;
  $('#level-title').text('level ' + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let chosenColor = buttonColors[randomNumber];
  gamePattern.push(chosenColor)
  console.log(gamePattern)
  $("#" + chosenColor).fadeIn(1000).fadeOut(100).fadeIn(1000);
};

function playSound(name){
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $('#' + currentColor).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence()
      }, 1000)
    }
  } else {
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(function(){
      $('body').removeClass('game-over')
    }, 200);
    $('#level-title').text('Game Over, Press Any Key to Restart');
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}