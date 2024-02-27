import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import HighScores from './components/HighScores';
import GameOver from './components/GameOver';
import './App.css';

function App() {
  const [screen, setScreen] = useState('start');
  const [finalScore, setFinalScore] = useState(0);

  return (
    <div className="App">
      <div className="App-container">
        {screen === 'start' && <StartScreen onStart={() => setScreen('quiz')} onViewHighScores={() => setScreen('highScores')} />}
        {screen === 'quiz' && <Quiz onGameOver={() => setScreen('gameOver')} setFinalScore={setFinalScore} />}
        {screen === 'highScores' && <HighScores onBack={() => setScreen('start')} />}
        {screen === 'gameOver' && <GameOver onRestart={() => setScreen('start')} finalScore={finalScore} />}
      </div>
    </div>
  );
}

export default App;
