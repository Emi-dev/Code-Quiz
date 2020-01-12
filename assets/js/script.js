// element to display the time left
var timeLeftSpan = document.querySelector("#timeLeft");
// header element of the intro page
var quizHeader = document.querySelector("#quizHeader");
// division displaying the introduction and start button
var quizIntroDiv = document.querySelector("#quizIntro");
// start button element
var startBtn = document.querySelector("#startBtn");
// division displaying the quize questions and answer choices
var quizContentDiv = document.querySelector("#quizContent");
// element to display the questions
var questionTitle = document.querySelector("#questionTitle");
// element to display the answer choices (buttons)
var answerChoices = document.querySelector("#answerChoices");
// division displaying whether the user answer is correct or wrong.
var answerResult = document.querySelector("#answerResult");
// element to display the answer result
var resultText = document.querySelector("#resultText");
// element (button) to move to the next question
var nextBtn = document.querySelector("#nextBtn");
// division displaying at the end: the user's final score and initial input
var quizEnd = document.querySelector("#quizEnd");
// element to display the user score 
var userScore = document.querySelector("#userScore");
// user's initials input element
var userInitials = document.querySelector("#userInitials");
// user's initials submit button element
var submitBtn = document.querySelector("#submitBtn");

// question index counter
var currentIndex;
// time left
var timeLeft;
// variable to contain the ID value returned by setInterval()
var timeInterval;

// questions list
var questions = [
    // question 1
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["booleans", "alerts", "strings", "numbers"],
      answer: "alerts"
    },
    //question 2
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["parentheses", "quotes", "curly brackets", "square brackets"],
      answer: "parentheses"
    },
    //question 3
    {
        title: "What is the HTML tag under which one can write the JavaScript code?",
        choices: ["<script>", "<javascript>", "<scripted>", "<js>"],
        answer: "<script>"
    },
    //question 4
    {
        title: "Which of the following is the correct syntax to display “Hello World!” in an alert box using JavaScript?",
        choices: ["alertbox(“Hello World!”);", "msg(“Hello World!”);", "msgbox(“Hello World!”);", "alert(“Hello World!”);"],
        answer: "alert(“Hello World!”);"
    },
    //question 5
    {
        title: "Which of the following is not a reserved word in JavaScript?",
        choices: ["interfaces", "throws", "program", "short"],
        answer: "program"
    },
    //question 6
    {
        title: "What will be logged in console? \nconsole.log(('b' + 'a' + + 'a' + 'a').toLowerCase());",
        choices: ["banullaa", "bananaa", "baaa", "banana"],
        answer: "banana"
    }
  ];

// when "Start Quiz" button clicked
startBtn.addEventListener("click", () => {
    // start quiz
    startQuiz();
});

// when the answer was chosen (answer choice buttun clicked)
answerChoices.addEventListener("click", event => {
    var choiceEl = event.target;
    if (choiceEl.matches("button")){
        // variable to store the user's answer choice
        var userChoice = choiceEl.textContent;
        // evaluate the user's answer 
        evaluateAnswer(userChoice);
        // if the user reaches to the end of the quiz
        if (currentIndex === questions.length - 1) {
            endOfQuiz();
        }  
    }
});

// when the "Next Question" button is clicked
nextBtn.addEventListener("click", () => {
    // remove answer choices for the previsous question
    resetQuestionChoice();
    // increment the question index
    currentIndex++;
    if (currentIndex < questions.length && timeLeft > 0) {
        // create and render the new question
        remderQuestion(currentIndex);
        // create and render the answer choices for the new question
        renderChoices(currentIndex);
    } else {    // when the quiz ends
        showTheEndPage();
    }
});

// when the "Submit" (the final score and the initials) button is clicked
submitBtn.addEventListener("click", () => {
    if (!userInitials.value) { // if the initials have not been entered
        alert("Please enter your initials!");
    } else {
        // store the score in localStorage
        storeScore();
    }
});

// function that starts the code quiz
function startQuiz() {
    // set/reset the currentIndex to 0
    currentIndex = 0;
    // disable the introduction division
    quizIntroDiv.setAttribute("style", "display: none;");
    // enable the quiz content division
    quizContentDiv.setAttribute("style", "display: block;");

    resetQuestionChoice();
    remderQuestion(currentIndex);  
    renderChoices(currentIndex);
    startTimer();
}

// function that renders a question of the given index
function remderQuestion(index) {
    // disable the answerResult division when a new question displayed
    answerResult.setAttribute("style", "display: none;");
    // assign/reassign the question's text content
    quizHeader.textContent = "Question " + (index + 1);
    questionTitle.textContent = questions[index].title;
}

// function that renders (create buttons) answer choices of the given index question
function renderChoices(index) {
    var choices = questions[index].choices;

    choices.forEach(element => {
        var choiceBtn = document.createElement("button");
        choiceBtn.textContent = element;
        choiceBtn.setAttribute("class", "btn btn-lg rounded");
        answerChoices.appendChild(choiceBtn);
    });
}

// function that checks whether the user's answer(choice) is right or wrong
function evaluateAnswer(choice) {
    // variable to contain the result message
    var questionResult;
    // variable to store the correct answer
    var correctAnswer = questions[currentIndex].answer;

    if (choice === correctAnswer) {
        questionResult = "Correct!"
        answerResult.setAttribute("style", "display: block; color: green;");
    } else {
        questionResult = "Wrong! The correct Answer is: " + correctAnswer;
        answerResult.setAttribute("style", "display: block; color: red;");
        // the user loses 15 seconds from time left when answering wrong
        if (timeLeft >= 15) {
            timeLeft -= 15;
        } else {
            timeLeft = 0;
            clearInterval(timeInterval);
        }
    }
    // display the result in the <p> (first element child of anserResult division)
    resultText.textContent = questionResult;
    // answer choice buttons get disabled once the user chooses one
    disableChoices();
}

// function to disable the answer choices (buttons)
function disableChoices() {  
    var childrenArray = Array.from(answerChoices.children);
    childrenArray.forEach(element => {element.disabled = true;});
}

// removes all children (buttons of answer choices) from answerChoices division
function resetQuestionChoice() {
    while (answerChoices.firstChild) {
        answerChoices.removeChild(answerChoices.firstChild);
    }
}

// function to do the end of the game process
function endOfQuiz() {
    clearInterval(timeInterval);
    disableChoices();
    answerResult.setAttribute("style", "display: block");
    nextBtn.textContent = "See Your Score";
}

// function that show the page to display at the end of the quiz
function showTheEndPage() {
    // empty the header and disable the quiz content and answer result divisions
    quizHeader.textContent = "";
    quizContentDiv.setAttribute("style", "display: none;");
    answerResult.setAttribute("style", "display: none");
    // enable the quizEnd division to show the final score and get the user initials
    quizEnd.setAttribute("style", "display: block");
    // calculate and show the score
    userScore.textContent = timeLeft;
}

// function to store the score in localStorage
function storeScore() {
    var currentUserInitials = userInitials.value.toUpperCase();
    // get the stores highscores array of objects from localStorage
    // highScores is an array of objects. Each object in hiScores has initals & score properties.
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores) {
        // get the current user's index in the stored (old) score data (highScores)
        currentUserIndex = storedScores.findIndex(x => x.initials === currentUserInitials);
        // if the the user's score data is already in localStorage and he/she got his/her highest score (higher than the one stored)
        if (currentUserIndex != -1) {
            if (timeLeft > storedScores[currentUserIndex].score) {
            // update the stored score with the new score (timeLeft)
            storedScores[currentUserIndex].score = timeLeft;
            }
        } else { // if the user's score data is not in localStorage (but other users' data already exists)
            storedScores.push({initials: currentUserInitials, score: timeLeft});
        }
    } else { // if there is no score data exists (very first time or after localStorage is cleared)
        storedScores = [];
        storedScores.push({initials: currentUserInitials, score: timeLeft});
    }
    // re-store the storedScores array with updated score of the user
    localStorage.setItem("highScores", JSON.stringify(storedScores));
}

// quiz timer function
function startTimer() {
    // set the time to the number of questions * 15(seconds)
    timeLeft = questions.length * 15;

    timeInterval = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft === 0) {
            endOfQuiz();
        }
    }, 1000);
}