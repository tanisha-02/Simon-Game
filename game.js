var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var randomNumber;
var userClickedPattern=[];
var userChosenColour;
var randomChosenColour;
var started=false;
var level=0;
var score=0;
$(document).keypress(function()
{
    if(!started)
    {
        // $("#level-title").text("Level: "+level);
        nextSequence();
        started=true;
    }
});
function nextSequence()
{
    userClickedPattern=[];
    // score+=10;
    level++;
    $("#level-title").text("Level: "+level);
    randomNumber=Math.random()*4;
    randomNumber=Math.floor(randomNumber);
    randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
animatePress(randomChosenColour);
}

$(".btn").click(function()
{
  userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel)
{
/*firstly, we will check if the currentLevel matches in both the functions or not,if it matches
then,we will check the length of both the functions matches or not, if it does then we will call
nextSequence after a delay of 1s.
if in the first go, randomcolor was red and userClickedPattern is also red then we will check the 
length which is zero now nextSequence will be called now the userclickedpattern array will be set 
to an empty array and now if gamepattern has two colors red,green(green is randomly chosen now)
Suppose userclicked pattern has now red color which is clicked by the user and its level is 0 as it 
was made null when nextSequence was called then checkAnswer will match userClickedPattern[0]===gamePattern[0],
it matches then it will check the length of both which doesn't match as it is 0 and 1,then it will
for the user to click on the next button if the user clicks green then again checkAnswer will be 
called and checked and now both the conditions matches now,so a call to nextSequence will be made..
if it doesn't matches then else condition will be executed*/
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        // if(level==1)
        // $("h2").text("Your current score is:"+(level*10));
        // else
        // $("h2").text("Your current score is:"+(level-1)*10);
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }   
    }
    else
    {
        console.log('wrong');
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function playSound(name)
{
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour)
{
    // document.querySelector("."+currentColour).classList.add("pressed");
    $("."+currentColour).addClass("pressed");
    setTimeout(function()
    {
        document.querySelector("."+currentColour).classList.remove("pressed"),100;  
    })
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}
