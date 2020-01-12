// element to show the highscore on hiscore page
var highScoreArea = document.querySelector("#highScoreArea");

showHighScore();

function showHighScore() {
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores) {
        var scoreTable = document.querySelector("#scoreTable");

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