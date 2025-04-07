import React from 'react';
import './WordleRow.css';

// Definimos los tipos para las props del componente
interface WordleRowProps {
  letters: string[];
  currentPosition: number;
}

const WordleRow: React.FC<WordleRowProps> = ({ letters, currentPosition }) => {
  // Número de cubos en la fila (Wordle usa 5)
  const CUBE_COUNT = 5;

  return (
    <div className="wordle-row">
      {Array.from({ length: CUBE_COUNT }).map((_, index) => {
        // Determina si este cubo es el actual (donde se escribirá la próxima letra)
        const isActive = index === currentPosition;
        // Obtiene la letra para este cubo (o cadena vacía si no hay)
        const letter = letters[index] || '';

        return (
          <div 
            key={index}
            className={`wordle-cube ${isActive ? 'active' : ''}`}
          >
            <span className="letter">{letter}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WordleRow;