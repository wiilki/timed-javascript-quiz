import React, { useState, useEffect } from 'react';
import questionsData from './questions'; // Importing the questions data
import '../styles/quiz.css';

// Function to shuffle an array
function shuffleArray(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function Quiz({ onGameOver, setFinalScore }) {
  // Initialize questions state with shuffled questions and choices
  const [questions, setQuestions] = useState(() => shuffleArray(
    questionsData.map(q => ({
      ...q,
      choices: shuffleArray([...q.choices]) // Shuffling choices for each question
    }))
  ));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  // Handle quiz end condition
  useEffect(() => {
    if (timer <= 0 || currentQuestionIndex >= questions.length) {
      onGameOver();
      setFinalScore(correctAnswers);
    }
  }, [timer, currentQuestionIndex, onGameOver, setFinalScore, correctAnswers]);

  // Timer countdown
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(currentTimer => !showFeedback && currentTimer > 0 ? currentTimer - 1 : currentTimer);
    }, 1000);

    // Clear interval on feedback
    if (showFeedback) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [showFeedback]);

  // Handling answer selection
  const handleAnswer = (choice) => {
    setSelectedAnswer(choice);
    setShowFeedback(true);

    setTimeout(() => {
      let isCorrect = choice === questions[currentQuestionIndex].answer;
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1); // Increment correct answers
      } else {
        setTimer(t => Math.max(t - 10, 0)); // Penalty for wrong answer
      }

      if (currentQuestionIndex === questions.length - 1) {
        // If this is the last question, end the quiz
        onGameOver();
        setFinalScore(isCorrect ? correctAnswers + 1 : correctAnswers); // Update final score
      } else {
        // Move to the next question and hide feedback
        setShowFeedback(false);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    }, 1000);
  };

  return (
    <div className='quiz'>
      <div className='timer'>Timer: {timer}</div>
      <div className='question'>{questions[currentQuestionIndex]?.question}</div>
      <div className='choices'>
        {questions[currentQuestionIndex]?.choices.map((choice, index) => (
          <button
            key={index} // Using index as key because of shuffling
            disabled={showFeedback}
            onClick={() => handleAnswer(choice)}
            className={`${showFeedback ? (choice === questions[currentQuestionIndex].answer ? 'correct' : 'incorrect') : ''} ${choice === selectedAnswer ? 'selected' : ''}`}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
