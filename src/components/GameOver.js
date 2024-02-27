import React, { useState } from 'react';
import '../styles/game-over.css'

function GameOver({ onRestart, finalScore }) {
  const [name, setName] = useState('');

  const saveScore = () => {
    // Validate if the name field is not empty
    if (name.trim() === '') {
      alert('Please enter your name to save your score.');
      return;
    }

    // Use the finalScore prop instead of the placeholder comment
    const newScore = { name, value: finalScore };
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(scores));
    onRestart(); // Go back to start screen
  };

  return (
    <div className='game-over'>
      <h2>Game Over</h2>
      <div>Your score: {finalScore}</div> {/* Display the final score */}
      <label>
        Your Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button onClick={saveScore}>Save Score</button>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}

export default GameOver;
