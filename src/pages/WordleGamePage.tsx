import React, { useState, useEffect, useCallback } from 'react';
import WordleRow from '../components/WordleRow';

const WordleGamePage: React.FC = () => {
  // Estado para las letras de la fila actual
  const [letters, setLetters] = useState<string[]>(['', '', '', '', '']);
  // Posición actual del cursor
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  // Estado para manejar el feedback al usuario
  const [message, setMessage] = useState<string>('Escribe tu palabra');

  // Palabra objetivo (la que el usuario debe adivinar)
  const targetWord = "REACT";

  // Manejador de teclado
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (/^[a-zA-Z]$/.test(e.key)) {
      // Si es una letra y hay espacio disponible
      if (currentPosition < 5) {
        const newLetters = [...letters];
        newLetters[currentPosition] = e.key.toUpperCase();
        setLetters(newLetters);
        setCurrentPosition(currentPosition + 1);
      }
    } else if (e.key === 'Backspace') {
      // Manejar borrado
      if (currentPosition > 0) {
        const newLetters = [...letters];
        newLetters[currentPosition - 1] = '';
        setLetters(newLetters);
        setCurrentPosition(currentPosition - 1);
      }
    } else if (e.key === 'Enter' && currentPosition === 5) {
      // Verificar palabra cuando se presiona Enter
      const guessedWord = letters.join('');
      if (guessedWord === targetWord) {
        setMessage('¡Correcto! 🎉');
      } else {
        setMessage('Intenta otra vez');
        // Aquí podrías añadir lógica para colorear las letras
      }
    }
  }, [letters, currentPosition]);

  // Efecto para añadir/remover el event listener del teclado
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="wordle-game-container">
      <h1>Wordle Game</h1>
      <div className="game-board">
        <WordleRow 
          letters={letters} 
          currentPosition={currentPosition} 
        />
      </div>
      <div className={`message ${message.includes('🎉') ? 'success' : ''}`}>
        {message}
      </div>
      <div className="instructions">
        <p>Escribe una palabra de 5 letras y presiona Enter</p>
      </div>
    </div>
  );
};

export default WordleGamePage;