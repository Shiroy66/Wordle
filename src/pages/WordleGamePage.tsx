import React, { useState, useEffect } from "react";
import WordleGame from "../components/WordleGame";
import wordsData from "../data/words.json";

const WordleGamePage: React.FC = () => {
  const [targetWord, setTargetWord] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const getNewWord = () => {
    const newWord = wordsData.words[
      Math.floor(Math.random() * wordsData.words.length)
    ].toUpperCase();
    setTargetWord(newWord);
  };

  useEffect(() => {
    getNewWord();
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="text-white">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <WordleGame 
        key={targetWord}
        targetWord={targetWord}
        validWords={wordsData.words.map(word => word.toUpperCase())}
        onNewWordRequested={getNewWord}
        onGameEnd={(won) => {
          console.log(won ? `¡Ganaste! La palabra era ${targetWord} 🎉` 
                          : `¡Perdiste! La palabra era ${targetWord} 😢`);
        }}
      />
    </div>
  );
};

export default WordleGamePage;