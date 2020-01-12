// element to show the highscore on hiscore page
var highScoreArea = document.querySelector("#highScoreArea");
console.log(highScoreArea);

showHighScore();

function showHighScore() {
    var storedHighScore = JSON.parse(localStorage.getItem("userHighScore"));
    if (storedHighScore) {
        highScoreArea.textContent = "Your Highscore is: " + storedHighScore.highScore;
    }
}