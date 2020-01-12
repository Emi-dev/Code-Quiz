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
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores) {
        storedScores.forEach(user => {
            var scoreRow = document.createElement("tr");
            var initialData = document.createElement("td");
            var scoreData = document.createElement("td");
            initialData.textContent = user.initials;
            scoreData.textContent = user.score;
            scoreRow.appendChild(initialData);
            scoreRow.appendChild(scoreData);
            scoreTable.appendChild(scoreRow);
        });
    } else {
        highScoreArea.textContent = "There is no highscore data";
    }
}

// function to clear the highscore table
function clearTable() {
    while (scoreTable.firstChild) {
        scoreTable.removeChild(scoreTable.firstChild);
    }
}