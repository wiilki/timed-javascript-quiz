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
var isCorrect = $('#isCorrect');
var userResultsDiv = document.querySelector('#userResultsDiv');
var startOverBtn = document.querySelector('#startOverBtn');
var initialsInput = document.querySelector("#initialsInput");
var saveBtn = document.querySelector("#saveBtn");
var viewScoreBtn = document.querySelector('#viewScoreBtn')
var scoresList = document.querySelector("#scoresList");
var timerDiv = document.querySelector('#timerDiv');
var playAgainBtn = document.querySelector('#playAgainBtn');
var clearBtn = document.querySelector('#clearBtn');
var startingTime = 10;
var timeLeft = startingTime;
var questionIndex = 0;
var currentScore = 0;
var scoresArray = [];

// Array of questions and answers
var questionArray = [
  {
    question: "Which of the following is correct about JavaScript?",
    choices: ["A: JavaScript is Assembly-language", "B: JavaScript is an Object-Based language", "C: JavaScript is an Object-Oriented language", "D: JavaScript is a High-level language"],
    answer: btnB
  },
  {
    question: "Arrays in JavaScript are defined by which of the following statements?",
    choices: ["A: It is an ordered list of values", "B: It is an ordered list of objects", "C: It is an ordered list of string", "D: It is an ordered list of functions"],
    answer: btnA
  },
  {
    question: "Which of the following is not javascript data types?",
    choices: ["A: Null type", "B: Undefined type", "C: Number type", "D: All of the mentioned"],
    answer: btnD
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    choices: ["A: getElementbyId()", "B: getElementsByClassName()", "C: Both A and B", "D: None of the above"],
    answer: btnC
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript?",
    choices: ["A: stringify()", "B: parse()", "C: convert()", "D: None of the above"],
    answer: btnA
  },
];

// Start by hiding the all pages except Start Page
quizPage.style.visibility = 'hidden';
resultPage.style.visibility = 'hidden';
scoresPage.style.visibility = 'hidden';

// Makes start page visible
function goToStart() {
  startPage.style.visibility = 'visible';
  quizPage.style.visibility = 'hidden';
  scoresPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'hidden';
}

// Makes Results Page appear
function goToResults() {
  quizPage.style.visibility = 'hidden';
  scoresPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'visible';
  userResultsDiv.textContent = currentScore.valueOf();
}

// Hides all pages except scoresPage
function goToScores() {
  init();
  startPage.style.visibility = 'hidden';
  resultPage.style.visibility = 'hidden';
  quizPage.style.visibility = 'hidden';
  scoresPage.style.visibility = 'visible';
}

// Makes quizPage and questions visible
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
  timeLeft = startingTime;
  questionIndex = 0;
  currentScore = 0;
  setTime();
  goToStart();
}

// Renders array and appends li for each object
function renderArray() {
  scoresList.innerHTML = "";

  // Render a new li for each score for the length of the array
  for (var i = 0; i < scoresArray.length; i++) {
    var score = scoresArray[i];
    var showInitials = score.userInitials;
    // Makes initials uppercase
    var initialsUpper = showInitials.toUpperCase();
    var showScores = score.userScore;
    var li = document.createElement("li");
    li.textContent = initialsUpper + ": " + showScores;
    li.setAttribute("data-index", i);
    scoresList.appendChild(li);
  }
}

// Save data to local storage
function storeScores() {
  localStorage.setItem("scores", JSON.stringify(scoresArray));
}

// Set time interval to 1s
function setTime() {
  var timerInterval = setInterval(function () {
    timeLeft--;
    timerDiv.textContent = "Time left: " + timeLeft + " seconds";
    // Message for if time runs out or user finishes quiz
    if (timeLeft === 0 || questionIndex >= questionArray.length) {
      clearInterval(timerInterval);
      timerDiv.textContent = "YOU'RE ALL DONE!";
      timeLeft = 0;
      goToResults();
    }
  }, 1000);
}

// Click will start quiz
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startQuiz();
  setTime();
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
    timeLeft = timeLeft - 10;
    isCorrect.textContent = "WRONG";
  }
  $('#isCorrect').hide().html(isCorrect.textContent).fadeIn('slow').delay(500).hide(3);
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

var invalidMsgDiv = document.querySelector('#invalidMsgDiv');

// Click save will assign values to keys if value is not blank and add to array
saveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  invalidMsgDiv.innerHTML = "";
  var userInfo = {
    userInitials: initialsInput.value,
    userScore: currentScore.valueOf(),
  };
  if (initialsInput.value === "") {
    invalidMsgDiv.append("Cannot be blank!");
    return;
  } else if (currentScore === 0){
    invalidMsgDiv.append("You scored a 0. Try again!");
    return;
  } else {
    scoresArray.push(userInfo);
    initialsInput.value = "";
    storeScores();
    goToScores();
  }
});

// Clicking will go to start page
playAgainBtn.addEventListener("click", function (event) {
  event.preventDefault();
  reStartQuiz();
});

// Clear button will clear local storage and current scoresArray, then re-render
clearBtn.addEventListener("click", function (event) {
  event.preventDefault();
  localStorage.clear();
  scoresArray = [];
  renderArray();
});

function init() {
  // Get stored scoresArray from localStorage
  var storedscoresArray = JSON.parse(localStorage.getItem("scores"));
  // If scoresArray were retrieved from localStorage, update the scoresArray array to it
  if (storedscoresArray !== null) {
    scoresArray = storedscoresArray;
  }

  renderArray();
  console.log(scoresArray)
}

init();
