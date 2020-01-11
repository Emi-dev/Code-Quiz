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
var ansewerResult = document.querySelector("#ansewerResult");
// element (button) to move to the next question
var nextBtn = document.querySelector("#nextBtn");

// question index counter
var currentIndex;
// the user's wrong answer counter
var wrongCount;
// time left
var timeLeft;
// variable to contain the ID value returned by setInterval()
var timeInterval;

// initialize the quizHeader (intro)
quizHeader.textContent = "Coding Quiz Challenge!";

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
        // variable to contain the result message
        var questionResult;
        // variable to store the correct answer
        var correctAnswer = questions[currentIndex].answer;

        if (userChoice === correctAnswer) {
            questionResult = "Correct!"
            ansewerResult.setAttribute("style", "display: block; color: green;");
        } else {
            questionResult = "Wrong! The correct Answer is: " + correctAnswer;
            ansewerResult.setAttribute("style", "display: block; color: red;");
            wrongCount++;
        }
        // display the result in the <p> (first element child of anserResult division)
        ansewerResult.firstElementChild.textContent = questionResult;
        // answer choice buttons get disabled once the user chooses one
        disableChoices();
        // increment the question index
        currentIndex++;
    }
});

// when the "Next Question" button is clicked
nextBtn.addEventListener("click", () => {
    // remove answer choices for the previsous question
    resetChoices();
    if (currentIndex < questions.length) {
        // create and render the new question
        remderQuestion(currentIndex);
        // create and render the answer choices for the new question
        renderChoices(currentIndex);
    } else {    // when the quiz ends
        // stop the timer
        clearInterval(timeInterval);
        // calculate and show the score
        // get the user initials
        // store in locasStorage
    }
});

// function that starts the code quiz
function startQuiz() {
    // set/reset the currentIndex and wrongCount to 0
    currentIndex = 0;
    wrongCount = 0;
    // disable the introduction division
    quizIntroDiv.setAttribute("style", "display: none;");
    // enable the quiz content division
    quizContentDiv.setAttribute("style", "display: block;");

    resetChoices();
    remderQuestion(currentIndex);  
    renderChoices(currentIndex);
    startTimer();
}

// function that renders a question of the given index
function remderQuestion(index) {
    // disable the ansewerResult division when a new question displayed
    ansewerResult.setAttribute("style", "display: none;")
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

function disableChoices() {  
    var childrenArray = Array.from(answerChoices.children);
    childrenArray.forEach(element => {element.disabled = true;});
}

// removes all children (buttons of answer choices) from answerChoices division
function resetChoices() {
    while (answerChoices.firstChild) {
        answerChoices.removeChild(answerChoices.firstChild);
    }
}

// quiz timer function
function startTimer() {
    // set the time to the number of questions * 15(seconds)
    timeLeft = questions.length * 15;

    timeInterval = setInterval(() => {
        timeLeft--;
        timeLeftSpan.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}