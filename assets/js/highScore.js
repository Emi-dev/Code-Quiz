// element to show the highscore on hiscore page
var highScoreArea = document.querySelector("#highScoreArea");
// table element to add rows (scores)
var scoreTable = document.querySelector("#scoreTable");
// clear highscores button element
var clearScoresBtn = document.querySelector("#clearScoresBtn");

// show highscore table
showHighScore();

// when "Clear Highscores" button is clicked
clearScoresBtn.addEventListener("click", () => {
    localStorage.clear();
    clearTable();
});

// function to create and display the highscore table
function showHighScore() {
    // get the stored data (an array of objects that contains "initials" and "score" properties)
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores) {
        storedScores.forEach(user => {
            // create table row and table datas
            var scoreRow = document.createElement("tr");
            var initialData = document.createElement("td");
            var scoreData = document.createElement("td");
            // assign the user initials to the textContent of table data
            initialData.textContent = user.initials;
            // assign the user score to the textContent of table data
            scoreData.textContent = user.score;
            // append the table data (initials) to the table row
            scoreRow.appendChild(initialData);
            // append the table data (score) to the table row
            scoreRow.appendChild(scoreData);
            // append the row to the table
            scoreTable.appendChild(scoreRow);
        });
    } else {
        showNoScoreMsg();
    }
}

// function to clear the highscore table
function clearTable() {
    while (scoreTable.firstChild) {
        scoreTable.removeChild(scoreTable.firstChild);
    }
    showNoScoreMsg();
}

function showNoScoreMsg() {
    highScoreArea.textContent = "There is no highscore data";
}