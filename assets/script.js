var startPage = document.querySelector("#startPage");
var quizPage = document.querySelector("#quizPage");
var resultPage = document.querySelector("#resultPage");
var scoresPage = document.querySelector("#scoresPage");
var startBtn = document.querySelector("#startBtn");
var questionDiv = document.querySelector("#questionDiv");
var btnA = document.querySelector("#btnA");
var btnB = document.querySelector("#btnB");
var btnC = document.querySelector("#btnC");
var btnD = document.querySelector("#btnD");
var possibleAnsDiv = document.querySelector('#possibleAnsDiv');
var isCorrect = document.querySelector('#isCorrect');
var userResultsDiv = document.querySelector('#userResultsDiv');
var startOverBtn = document.querySelector('#startOverBtn');
var initialsForm = document.querySelector("#initialsForm");
var initialsInput = document.querySelector("#initialsInput");
var saveBtn = document.querySelector("#saveBtn");
var viewScoreBtn = document.querySelector('#viewScoreBtn')
var scoresList = document.querySelector("#scoresList");
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
  questionDiv.textContent = questionArray[questionIndex].question;
  btnA.textContent = questionArray[questionIndex].choices[0];
  btnB.textContent = questionArray[questionIndex].choices[1];
  btnC.textContent = questionArray[questionIndex].choices[2];
  btnD.textContent = questionArray[questionIndex].choices[3];
}

// Makes Results Page appear
function goToResults() {
  quizPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'visible';
  userResultsDiv.textContent = currentScore.valueOf();
}

// Hides all pages except scoresPage
function goToScores() {
  startPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'hidden';
  quizPage.style.visibility = 'hidden';
  scoresPage.style.visibility = 'visible';
}

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

// Resets questionIndex and user's score to 0 then runs startQuiz()
function reStartQuiz() {
  questionIndex = 0;
  currentScore = 0;
  startQuiz();
}



var scoresArray = [];

function renderArray() {
  scoresList.innerHTML = "";

  // Render a new li for each score
  for (var i = 0; i < scoresArray.length; i++) {
    var score = scoresArray[i].value;
    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);
    scoresList.appendChild(li);
  }
}


function storeScores() {
  localStorage.setItem("scores", JSON.stringify(scoresArray));
}

function init() {
  // Get stored scoresArray from localStorage
  var storedscoresArray = JSON.parse(localStorage.getItem("scores"));
  // If scoresArray were retrieved from localStorage, update the scoresArray array to it
  if (storedscoresArray !== null) {
    scoresArray = storedscoresArray;
  }
  renderArray();
}

initialsForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var userInfo = {
    userInitials: initialsInput.value,
    userScore: currentScore.valueOf(),
  };

  // Return from function early if submitted initialsInput is blank
  if (initialsInput === "") {
    return;
  }

  // Add initials and score to scoresArray, clear the input
  scoresArray.push(userInfo);
  initialsInput.value = "";

  // Store updated scoresArray in localStorage, re-render the list
  storeScores();
  renderArray();
});







/////////////////////////////////////////////////////////////////



// Click will start quiz
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startQuiz();
});

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

// Event listener for start over button
startOverBtn.addEventListener("click", function (event) {
  event.preventDefault();
  reStartQuiz();
});

// Click link will go to scores page
viewScoreBtn.addEventListener("click", function (event) {
  event.preventDefault();
  goToScores();
});

