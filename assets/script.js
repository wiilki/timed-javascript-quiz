var startPage = document.querySelector("#startPage");
var quizPage = document.querySelector("#quizPage");
var resultPage = document.querySelector("#resultPage");
var scoresPage = document.querySelector("#scoresPage");
var startBtn = document.querySelector("#startBtn");
var askQuestion = document.querySelector("#questionDiv");
var btnA = document.querySelector("#btnA");
var btnB = document.querySelector("#btnB");
var btnC = document.querySelector("#btnC");
var btnD = document.querySelector("#btnD");

// Start by hiding the all pages except Start Page
quizPage.style.visibility = 'hidden';
resultPage.style.visibility = 'hidden';
scoresPage.style.visibility = 'hidden';

// Makes quizPage visible
function startQuiz() {
    startPage.style.visibility = 'hidden';
    resultPage.style.visibility = 'hidden';
    resultPage.style.visibility = 'hidden';
    quizPage.style.visibility = 'visible';
    askQuestion.textContent = questions[index].question;
    btnA;
    btnB;
    btnC;
    btnD;
  }

  startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
  });