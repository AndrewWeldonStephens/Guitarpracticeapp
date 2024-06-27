document.addEventListener('DOMContentLoaded', function() {
    const practiceButton = document.getElementById('practice-button');
    const resultsContainer = document.getElementById('results-container');
    const timerDisplay = document.getElementById('timer-display');
    const timerButtons = document.querySelectorAll('.timer-button');
    let countdownTimer;

    practiceButton.addEventListener('click', function() {
        const d4Result = rollDice('d4');
        const d8Result = rollDice('d8');
        const d12Result = rollDice('d12');

        resultsContainer.innerHTML = `
            <div class="result">Guitar Technique: ${d4Result}</div>
            <div class="result">Music Mode: ${d8Result}</div>
            <div class="result">Music Key: ${d12Result}</div>
        `;
    });

    timerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const timeInSeconds = parseInt(button.getAttribute('data-time'), 10);
            startTimer(timeInSeconds);
        });
    });

    function startTimer(duration) {
        clearInterval(countdownTimer);
        const startTime = Date.now();
        const endTime = startTime + (duration * 1000);

        displayTimeLeft(duration);

        countdownTimer = setInterval(() => {
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);
            if (secondsLeft < 0) {
                clearInterval(countdownTimer);
                timerDisplay.textContent = 'Timer expired!';
                return;
            }
            displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function displayTimeLeft(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;
        const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerDisplay.textContent = display;
    }

    function rollDice(diceType) {
        switch (diceType) {
            case 'd4':
                const d4Techniques = ['Alternate Picking', 'Sweeping', 'String Skipping', 'Tapping'];
                return d4Techniques[getRandomNumber(0, 3)];
            case 'd8':
                const d8Modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian', 'Harmonic Minor'];
                return d8Modes[getRandomNumber(0, 7)];
            case 'd12':
                const d12Keys = ['C Major', 'C# Major', 'D Major', 'D# Major', 'E Major', 'F Major', 'F# Major', 'G Major', 'G# Major', 'A Major', 'A# Major', 'B Major'];
                return d12Keys[getRandomNumber(0, 11)];
            default:
                return 'Invalid dice type';
        }
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});