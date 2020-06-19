
//Audio files
const clickSound = new Audio("./resources/zapsplat_household_alarm_clock_large_snooze_button_press_002_12969.mp3");
const timerAlarm = new Audio("./resources/zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3");
const resetSound = new Audio("./resources/zapsplat_household_alarm_clock_button_press_12967.mp3");

//DOM control buttons
const playOrPauseButton = document.getElementById('play-pause-btn');
const resetButton = document.getElementById('reset-btn');

//Needed variables
let minutes;
let secondsLeft;
let countdown;
const clockFace = document.getElementById('clock-face');

function startTimer(minutes) {
    secondsLeft = minutes * 60;
    clickSound.play();

    //Initiate minutes countdown
    countdown = setInterval(() => {        
        secondsLeft--;       
        displayTimer(secondsLeft);

        //check if countdown is complete
        if(secondsLeft <= 0) {
            timerAlarm.play();
            clearInterval(countdown);
            minutes === 25 ? displayTimer(300) : displayTimer(1500);
            togglePlayOrPauseButton();
        }
    }, 1000);        
} 
   
function resetTimer() {
    resetSound.play();
    clearInterval(countdown);
    minutes = undefined;
    clockFace.innerHTML = `${25}:00`;
    document.title = 'Pomodoro Timer';
    playOrPauseButton.innerHTML = 'Play'; 
}

function displayTimer(seconds) {
    minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    clockFace.innerHTML = display;
    document.title = display + ' Pomodoro Timer';    
}

function togglePlayOrPauseButton() {
    playOrPauseButton.innerHTML === 'Play' ? playOrPauseButton.innerHTML = 'Pause' : playOrPauseButton.innerHTML = 'Play';
}

function PlayOrPause() {
    if (playOrPauseButton.innerHTML === 'Play') {        
        minutes === undefined ? startTimer(1) : startTimer(secondsLeft/60);
        togglePlayOrPauseButton();
    } else {
        clickSound.play();
        clearInterval(countdown);
        togglePlayOrPauseButton();
    }
}

//DOM manipulation

playOrPauseButton.onclick = PlayOrPause;
resetButton.onclick = resetTimer;

//Work session and Break buttons functionality - NEEDS REFACTORING

const workSessionButton = document.getElementById('work-session');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');

const workAndBreakButtons = [workSessionButton, shortBreakButton, longBreakButton];

workAndBreakButtons.forEach(button => {
    button.onclick = function() {
      clearInterval(countdown); 
      togglePlayOrPauseButton;
      
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


