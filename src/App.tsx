import React from 'react'; // Usa esta forma (ES modules)
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import WordleGame from './pages/WordleGamePage';

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="Conatiner">
      <h1>WORDLE BY SERGIO</h1>
      <WordleGame/>
    </div>
  );
}

export default App;