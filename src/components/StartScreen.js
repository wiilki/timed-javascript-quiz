import React from 'react';
import '../styles/start-screen.css'; 

function StartScreen({ onStart, onViewHighScores }) {
  return (
    <div className="start-screen">
      <h2>Javascript Code Quiz!</h2>
      <p>Test your knowledge of JavaScript Here</p>
      <button onClick={onStart}>Start Quiz</button>
      <button onClick={onViewHighScores}>View High Scores</button>
    </div>
  );
}

export default StartScreen;
