let seconds = 60;
let minutes;
let secondsLeft;
let countdown;
const clockFace = document.getElementById('clock-face');

function startTimer(minutes) {
    secondsLeft = minutes * 60;        
    //Initiate minutes countdown
    countdown = setInterval(() => {
        secondsLeft--;       
        displayTimer(secondsLeft);
        //console.log(secondsLeft);
        //check if countdown is complete
        if(secondsLeft < 0) {
            clearInterval(countdown);
            alert('Time-out');
        }
    }, 1000);        
} 
   
function resetTimer() {
    clearInterval(countdown);
    minutes = undefined;
    clockFace.innerHTML = `${25}:00`;
    document.title = 'Pomodoro Timer';
    playOrPauseButton.innerHTML = 'Play'; 
}

function displayTimer(seconds) {
    minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    clockFace.innerHTML = display;
    document.title = display + ' Pomodoro Timer';    
}

function togglePlayOrPause() {
    if (playOrPauseButton.innerHTML === 'Play') {
        minutes === undefined ? startTimer(25) : startTimer(secondsLeft/60);
        playOrPauseButton.innerHTML = 'Pause';
    } else {
        clearInterval(countdown);
        playOrPauseButton.innerHTML = 'Play';
    }
}

const playOrPauseButton = document.getElementById('play-pause-btn');
const resetButton = document.getElementById('reset-btn');

playOrPauseButton.onclick = togglePlayOrPause;
resetButton.onclick = resetTimer;

//Work session and Break buttons functionality - NEEDS REFACTORING

const workSessionButton = document.getElementById('work-session');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

const workAndBreakButtons = [workSessionButton, shortBreakButton, longBreakButton];

workAndBreakButtons.forEach(button => {
    button.onclick = function() {
      clearInterval(countdown); 
      playOrPauseButton.innerHTML = 'Play';
      
      switch(button.value) {
        case "work-session":
            secondsLeft = 1500 // 25 minutes
            break;
        case "short-break":
            secondsLeft = 300 // 5 minutes
            break;
        default:
            secondsLeft = 600 // 10 minutes
      }
      displayTimer(secondsLeft);
    }    
})


