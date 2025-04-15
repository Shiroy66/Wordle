import React, { useState, useEffect } from "react";
import WordleGame from "../components/WordleGame";
import wordsData from "../data/words.json";

const WordleGamePage: React.FC = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [loading, setLoading] = useState(true);

  // Cargar palabra aleatoria al montar el componente
  useEffect(() => {
    const getRandomWord = () => {
      const randomIndex = Math.floor(Math.random() * wordsData.words.length);
      return wordsData.words[randomIndex];
    };
    
    setTargetWord(getRandomWord().toUpperCase());
    setLoading(false);
  }, []);

  // Función para reiniciar con nueva palabra
  const handleNewGame = () => {
    const newWord = wordsData.words[
      Math.floor(Math.random() * wordsData.words.length)
    ].toUpperCase();
    setTargetWord(newWord);
  };

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <WordleGame 
        targetWord={targetWord}
        onGameEnd={(won) => {
          console.log(won ? `¡Ganaste! La palabra era ${targetWord} 🎉` 
                          : `¡Perdiste! La palabra era ${targetWord} 😢`);
        }}
      />
      
      <button
        onClick={handleNewGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Nueva palabra
      </button>
    </div>
  );
};

export default WordleGamePage;