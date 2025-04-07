import React, { useState } from 'react';
import WordleRow from './WordleRow';

const WordleGame: React.FC = () => {
  const [letters, setLetters] = useState<string[]>(['', '', '', '', '']);
  const [currentPosition, setCurrentPosition] = useState<number>(0);

  // Función para manejar la entrada de letras
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      // Lógica para borrar
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      const newLetters = [...letters];
      newLetters[currentPosition] = e.key.toUpperCase();
      setLetters(newLetters);
      setCurrentPosition(Math.min(currentPosition + 1, 4));
    }
  };

  return (
    <div className="wordle-game" tabIndex={0} onKeyDown={handleKeyPress}>
      <WordleRow letters={letters} currentPosition={currentPosition} />
    </div>
  );
};

export default WordleGame;