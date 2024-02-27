import React, { useState, useEffect } from 'react';
import questions from './questions';
import '../styles/quiz.css';

function Quiz({ onGameOver, setFinalScore }) { // Assuming setFinalScore is passed from App component
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers

  useEffect(() => {
    if (timer <= 0 || currentQuestionIndex >= questions.length) {
      onGameOver();
      setFinalScore(correctAnswers); // Pass the number of correct answers as the final score
    }
  }, [timer, currentQuestionIndex, onGameOver, setFinalScore, correctAnswers]);

  const handleAnswer = (choice) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (choice === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1); // Increment correct answers count
    } else {
      setTimer(timer - 10); // Adjust penalty as needed
    }

    // Proceed to next question or end quiz
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setTimeout(() => setCurrentQuestionIndex(nextQuestionIndex), 1000); // Move to next question after delay
    } else {
      setTimeout(() => {
        onGameOver();
        setFinalScore(correctAnswers + (choice === correctAnswer ? 1 : 0)); // Ensure last question's correct answer is counted
      }, 1000);
    }
  };

  return (
    <div>
      <div>Timer: {timer}</div>
      <div>Question: {questions[currentQuestionIndex]?.question}</div>
      <div>
        {questions[currentQuestionIndex]?.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => !showFeedback && handleAnswer(choice)} // Prevent clicking while showing feedback
            className={`
              ${showFeedback ? (choice === questions[currentQuestionIndex].answer ? 'correct' : 'incorrect') : ''}
              ${choice === selectedAnswer ? 'selected' : ''}
            `}
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;