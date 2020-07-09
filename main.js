//Audio files
const alarmSound = new Audio(
	'./resources/zapsplat_household_alarm_clock_old_fashioned_ring_very_short_44062.mp3'
);

//DOM buttons and clockDisplay
const playOrPauseButton = document.getElementById('play-pause-btn');
const resetButton = document.getElementById('reset-btn');
const timerButtons = Array.from(
	document.getElementsByClassName('timer-options')
);
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const clockFace = document.getElementById('clock-face');

//Needed variables
let minutes;
let secondsLeft;
let countdown;

function togglePlayOrPauseButton() {
	playOrPauseButton.innerHTML === 'Play'
		? (playOrPauseButton.innerHTML = 'Pause')
		: (playOrPauseButton.innerHTML = 'Play');
}

function displayTimer(seconds) {
	minutes = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${minutes < 10 ? '0' : ''}${minutes}:${
		remainderSeconds < 10 ? '0' : ''
	}${remainderSeconds}`;
	clockFace.innerHTML = display;
	document.title = display + ' Pomodoro Timer';
}

function startTimer(minutes) {
	secondsLeft = minutes * 60;

	//Initiate minutes countdown
	setInterval(() => {
		secondsLeft--;
		displayTimer(secondsLeft);

		//check if countdown is complete
		if (secondsLeft <= 0) {
			alarmSound.play();
			clearInterval();
			minutes === 25 ? (secondsLeft = 300) : (secondsLeft = 1500);
			displayTimer(secondsLeft);
			togglePlayOrPauseButton();
		}
	}, 1000);
}

function PlayOrPause() {
	if (playOrPauseButton.innerHTML === 'Play') {
		minutes === undefined ? startTimer(25) : startTimer(secondsLeft / 60);
		togglePlayOrPauseButton();
	} else {
		clearInterval(countdown);
		togglePlayOrPauseButton();
	}
}

function resetTimer() {
	clearInterval(countdown);
	minutes = undefined;
	clockFace.innerHTML = `${25}:00`;
	document.title = 'Pomodoro Timer';
	playOrPauseButton.innerHTML = 'Play';
}

function toggleTimerButtons() {
	clearInterval(countdown);
	playOrPauseButton.innerHTML = 'Play';

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
}

//DOM onclick functionalities

playOrPauseButton.addEventListener('click', PlayOrPause);
resetButton.addEventListener('click', resetTimer);
timerButtons.forEach((button) => {
	button.addEventListener('click', function () {
		{
			clearInterval(countdown);
			playOrPauseButton.innerHTML = 'Play';

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
		}
	});
});
