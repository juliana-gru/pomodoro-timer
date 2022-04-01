//Audio files
const alarmSound = new Audio(
	'./resources/zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3');

//DOM buttons and clockDisplay
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const workAndBreakButtons = Array.from(
	document.getElementsByClassName('timer-options'));
const clockFace = document.getElementById('clock-face');

//Needed variables
let minutes;
let secondsLeft;
let countdown;
let timerIsRunning = false;

function displayTimer(seconds) {
	minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes < 10 ? '0' : ''}${minutes}:${
		remainderSeconds < 10 ? '0' : ''
	}${remainderSeconds}`;
	clockFace.innerText = display;
	document.title = display + ' Pomodoro Timer';
}

function startTimer(minutes) {
	secondsLeft = minutes * 60;

	//Initiate minutes countdown
	countdown = setInterval(() => {
		secondsLeft--;
		displayTimer(secondsLeft);

		//check if countdown is complete
		if (secondsLeft <= 0) {
			alarmSound.play();
			clearInterval(countdown);
			timerIsRunning = false;
			minutes === 25 ? (secondsLeft = 300) : (secondsLeft = 1500);
			displayTimer(secondsLeft);			
		}
	}, 1000);
}

function PlayOrStop(e) {
	// e.preventDefault() is normally good practice to use
	e.preventDefault();
	if (timerIsRunning && e.target.innerText === 'Stop') {
		clearInterval(countdown);
		timerIsRunning = false;
	} else if (!timerIsRunning && e.target.innerText !== 'Stop') {
		minutes === undefined ? startTimer(25) : startTimer(secondsLeft / 60);
		timerIsRunning = true;
	}
}

//DOM onclick functionalities
startButton.addEventListener('click', PlayOrStop);
stopButton.addEventListener('click', PlayOrStop);
workAndBreakButtons.forEach((button) => {
	button.addEventListener('click', function () {
			clearInterval(countdown);
			switch (button.id) {
				case 'work-session':
					secondsLeft = 1500; // 25 minutes
					break;
				case 'short-break':
					secondsLeft = 300; // 5 minutes
					break;
				default:
					secondsLeft = 600; // 10 minutes
			}
			displayTimer(secondsLeft);
			timerIsRunning = false;		
	});
});

//Automatically start the timer for work and break btns
workAndBreakButtons.forEach((button) => {
	button.addEventListener('click', PlayOrStop)});
