import React, { useEffect, useState } from 'react';
import '../styles/high-scores.css'

function HighScores({ onBack }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Fetch scores from local storage
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    setScores(storedScores);
  }, []);

  const clearScores = () => {
    localStorage.removeItem('scores'); // Clear scores from local storage
    setScores([]); // Update state to reflect the change
  };

  return (
    <div className='high-scores'>
      <h2>High Scores</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{`${score.name}: ${score.value}`}</li>
        ))}
      </ul>
      <button onClick={clearScores}>Clear Scores</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

export default HighScores;
