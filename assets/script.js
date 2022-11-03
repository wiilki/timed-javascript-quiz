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
var possibleAnsDiv = document.querySelector('#possibleAnsDiv');
var isCorrect = document.querySelector('#isCorrect');
var userResults = document.querySelector('#userResults');
var startOverBtn = document.querySelector('#startOverBtn');
var questionIndex = 0;
var currentScore = 0;

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

// Makes quizPage visible
function startQuiz() {
  startPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'hidden';
  scoresPage.style.visibility = 'hidden';
  quizPage.style.visibility = 'visible';
  askQuestion.textContent = questionArray[questionIndex].question;
  btnA.textContent = questionArray[questionIndex].choices[0];
  btnB.textContent = questionArray[questionIndex].choices[1];
  btnC.textContent = questionArray[questionIndex].choices[2];
  btnD.textContent = questionArray[questionIndex].choices[3];
}

// Click will start quiz
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startQuiz();
});

// Moves to next index of questions then recalls startQuiz func
function nextQuestion() {
  questionIndex++;
  if (questionIndex < questionArray.length) {
    startQuiz();
  } else {
    // Goes to results page
    goToResults();
  }
}

// Event listener for each answer choice
possibleAnsDiv.addEventListener("click", function (event) {
  event.preventDefault();
  var userChoice = event.target;
  // If user chooses correct choice or wrong choice message
  if (userChoice === questionArray[questionIndex].answer) {
    isCorrect.textContent = "RIGHT";
    currentScore++;
  } else {
    isCorrect.textContent = "WRONG";
  }
  nextQuestion();
});

// Makes Results Page appear
function goToResults() {
  quizPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'visible';
  userResults.textContent = currentScore;
}

// Resets questionIndex and user's score to 0 then runs startQuiz()
function reStartQuiz() {
  questionIndex = 0;
  currentScore = 0;
  startQuiz();
}

startOverBtn.addEventListener("click", function (event) {
  event.preventDefault();
  reStartQuiz();
});

/////////////////////





