var startPage = document.querySelector("#startPage");
var quizPage = document.querySelector("#quizPage");
var resultPage = document.querySelector("#resultPage");
var scoresPage = document.querySelector("#scoresPage");
var startBtn = document.querySelector("#startBtn");

// Start by hiding the all pages except Start Page
quizPage.style.visibility = 'hidden';
resultPage.style.visibility = 'hidden';
scoresPage.style.visibility = 'hidden';

// Makes quizPage visible and startPage hidden
function startQuiz() {
    startPage.style.visibility = 'hidden';
    resultPage.style.visibility = 'hidden';
    resultPage.style.visibility = 'hidden';
    quizPage.style.visibility = 'visible';
  }

  startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
  });