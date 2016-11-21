// General variables for gameplay.
var gameHTML;
var counter = 20;
var questionArray = ["Who is married to Kanye West?", "She's got so much money, she could probably buy a country.", "He came out with the hit \"Baby\" that topped charts.", "She adopted like 20 kids.", "She topped the charts with her hit song \"Someone Like You\""];
var answerArray = [["Kim Kardashian", "JLo", "Halle Barry", "Rihanna"], ["Michelle Obama", "Megyn Kelly", "Oprah", "Taylor Swift"], ["Bruno Mars", "Justin Bieber", "Justin Timberlake", "Snoop Dogg"], ["Beyonce", "Angelina Jolie", "Megan Fox", "Madonna"], ["Jennifer Hudson", "Britney Spears", "Adele", "Celine Dion"]];
var imageArray = ["<img class='center-block img' src='assets/images/kim.jpg'>", "<img class='center-block img' src='assets/images/oprah.jpg'>", "<img class='center-block img' src='assets/images/justin.jpg'>", "<img class='center-block img' src='assets/images/angelina.jpeg'>", "<img class='center-block img' src='assets/images/adele.jpg'>"];
var correctAnswers = ["A. Kim Kardashian", "C. Oprah", "B. Justin Bieber", "B. Angelina Jolie", "C. Adele"];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var clickSound = new Audio("assets/sounds/click.mp3");

// Click event that initializes the game and puts questions/timer up.
$("body").on("click", "#start-button", function(event){
	clickSound.play();
	generateHTML();
	timerWrapper();
}); 

// Gameplay click events.  Generates wins/losses.
$("body").on("click", ".answer", function(event){
	clickSound.play();
	selectedAnswer = $(this).text();
	// if player selects an answer that matches the index value of the current question/answer combo.
	if(selectedAnswer === correctAnswers[questionCounter]) {
		// correct answer will clear the clock and add 1 to wins and show pic.
		clearInterval(theClock);
		generateWin();
	}
	else {
		// wrong answer will clear the clock and add 1 to losses and show pic.
		clearInterval(theClock);
		generateLoss();
	};
});

// Click event for final screen.  Reset button will run the resetGame().
$("body").on("click", ".reset-button", function(event){
	clickSound.play();
	resetGame();
});

// This will generate a loss to the unanswered score if question is not answered in time.  Shows pic.
function generateLossDueToTimeOut() {
	unansweredTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Time is up!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$("#content").html(gameHTML);
	setTimeout(wait, 3000);
};

// This will generate a win to the answered score if question is answered correctly.  Shows pic.
function generateWin() {
	correctTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$("#content").html(gameHTML);
	setTimeout(wait, 3000);
};

// This will generate a loss to the loss score if question is answered incorrectly.  Shows pic.
function generateLoss() {
	incorrectTally++;
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The answer is: "+ correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
	$("#content").html(gameHTML);
	setTimeout(wait, 3000);
};

// This generates the initial HTML once start button is clicked at the beginning.
function generateHTML() {
	gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. "+answerArray[questionCounter][1]+"</p><p class='answer'>C. "+answerArray[questionCounter][2]+"</p><p class='answer'>D. "+answerArray[questionCounter][3]+"</p>";
	$("#content").html(gameHTML);
};

// This function is used for when questions are answered, that will regenerate HTML from the questionCounter index.
function wait() {
	// Questions still in play.
	if (questionCounter < 4) {
	questionCounter++;
	generateHTML();
	counter = 20;
	timerWrapper();
	}
	// Show final screen once all of the questions are done.
	else {
		finalScreen();
	};
};

// Sets the timer to 20 seconds.
function timerWrapper() {
	// Sets the interval of clock in milliseconds.
	theClock = setInterval(twentySeconds, 1000);
	// This function determines whether clear out clock.
	function twentySeconds() {
		if (counter === 0) {
			clearInterval(theClock);
			generateLossDueToTimeOut();
		};
		// Counts down the timer if counter is greater than 0.
		if (counter > 0) {
			counter--;
		};
		// Appends counter to html of .timer.
		$(".timer").html(counter);
	};
};

// Summary page of results with score tallies.
function finalScreen() {
	gameHTML = "<p class='text-center'>The Results!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
	$("#content").html(gameHTML);
};

// Resets the score tallies and reruns the HTML functions to display time and questions again.
function resetGame() {
	questionCounter = 0;
	correctTally = 0;
	incorrectTally = 0;
	unansweredTally = 0;
	counter = 20;
	generateHTML();
	timerWrapper();
};
