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

// Array of questions and answers
var questionArray = [
    {
      question: "Question 1?",
      choices: ["A: isWrong", "B: isRight", "C: isWrong", "D: isWrong"],
      answer: btnB
    },
    {
      question: "Question 2?",
      choices: ["A: isRight", "B: isWrong", "C: isWrong", "D: isWrong"],
      answer: btnA
    },
    {
      question: "Question 3?",
      choices: ["A: isWrong", "B: isRight", "C: isWrong", "D: isWrong"],
      answer: btnB
    },
    {
      question: "Question 4?",
      choices: ["A: isWrong", "B: isWrong", "C: isRight", "D: isWrong"],
      answer: btnC
    },
    {
      question: "Question 5?",
      choices: ["A: isWrong", "B: isWrong", "C: isWrong", "D: isRight"],
      answer: btnD
    },
  ];

// Start by hiding the all pages except Start Page
quizPage.style.visibility = 'hidden';
resultPage.style.visibility = 'hidden';
scoresPage.style.visibility = 'hidden';

// Start at index 0
var questionIndex = 0;

// Makes quizPage visible
function startQuiz() {
    startPage.style.visibility = 'hidden';
    resultPage.style.visibility = 'hidden';
    resultPage.style.visibility = 'hidden';
    quizPage.style.visibility = 'visible';
    askQuestion.textContent = questionArray[questionIndex].question;
    btnA.textContent = questionArray[questionIndex].choices[0];
    btnB.textContent = questionArray[questionIndex].choices[1];
    btnC.textContent = questionArray[questionIndex].choices[2];
    btnD.textContent = questionArray[questionIndex].choices[3];
  }

  // Moves to next index of questions then recalls startQuiz func
function nextQuestion() {
  index++;
  if (questionIndex < questionArray.length) {
    startQuiz();
  } else {
    // Goes to results page
    userResults();
  }
}

  startBtn.addEventListener("click", function (event) {
    event.preventDefault();
    startQuiz();
  });