import React, { useState, useEffect } from "react";
import WordleRow from "./WordleRow";

type Status = "correct" | "present" | "incorrect" | "";
type GameStatus = "playing" | "won" | "lost";

interface WordleGameProps {
  targetWord: string;
  onGameEnd?: (won: boolean) => void;
}

const WordleGame: React.FC<WordleGameProps> = ({ targetWord, onGameEnd }) => {
  const wordLength = targetWord.length;
  const MAX_ATTEMPTS = 6;
  const LETTERS = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  const [guesses, setGuesses] = useState<string[][]>(
    Array(MAX_ATTEMPTS).fill(null).map(() => [])
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [validations, setValidations] = useState<Status[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [usedLetters, setUsedLetters] = useState<Record<string, Status>>({});

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => handleInput(e.key);
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentRow, gameStatus, guesses]);

  const updateGuesses = (newGuess: string[]) => {
    setGuesses(prev => prev.map((g, i) => (i === currentRow ? newGuess : g)));
  };

  const handleInput = (key: string) => {
    if (gameStatus !== "playing") return;
    
    const currentGuess = [...guesses[currentRow]];
    
    if (key === "Enter") {
      if (currentGuess.length === wordLength) {
        validateGuess(currentGuess);
      } else {
        triggerShakeAnimation();
      }
    } else if (key === "Backspace") {
      if (currentGuess.length > 0) {
        currentGuess.pop();
        updateGuesses(currentGuess);
      }
    } else if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        updateGuesses([...currentGuess, key.toUpperCase()]);
      }
    }
  };

  const validateGuess = (guess: string[]) => {
    const validation = guess.map((letter, index) => {
      let status: Status = "incorrect";
      if (letter === targetWord[index]) status = "correct";
      else if (targetWord.includes(letter)) status = "present";
      
      setUsedLetters(prev => ({ ...prev, [letter]: prev[letter] === "correct" ? "correct" : status }));
      return status;
    });

    setValidations(prev => {
      const newValidations = [...prev];
      newValidations[currentRow] = validation;
      return newValidations;
    });

    if (guess.join("") === targetWord) {
      setGameStatus("won");
      onGameEnd?.(true);
    } else if (currentRow === MAX_ATTEMPTS - 1) {
      setGameStatus("lost");
      onGameEnd?.(false);
    } else {
      setCurrentRow(prev => prev + 1);
    }
  };

  const triggerShakeAnimation = () => {
    const rowElement = document.querySelector(`.row-${currentRow}`);
    rowElement?.classList.add("animate-shake");
    setTimeout(() => rowElement?.classList.remove("animate-shake"), 500);
  };

  const resetGame = () => {
    setGuesses(Array(MAX_ATTEMPTS).fill(null).map(() => []));
    setCurrentRow(0);
    setValidations([]);
    setUsedLetters({});
    setGameStatus("playing");
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 font-['Pixelify_Sans']">
      <div className="flex flex-col gap-2  text-cyan-400 drop-shadow-neon">
        {guesses.map((guess, index) => (
          <WordleRow
            key={index}
            wordLength={wordLength}
            letters={guess}
            currentPosition={index === currentRow ? guess.length : -1}
            statuses={validations[index] || []}
            validated={index < currentRow}
            className={`row-${index}`}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2 text-2xl">
          {["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"].map((row, i) => (
            <div key={i} className="flex justify-center gap-1  text-green-400 drop-shadow-neon">
              {row.split("").map(letter => (
                <button
                  key={letter}
                  onClick={() => handleInput(letter)}
                  className={`w-8 h-10 flex items-center justify-center rounded
                    ${usedLetters[letter] ? `text-white ${usedLetters[letter]}` : "bg-gray-200"}
                    ${gameStatus !== "playing" ? "opacity-50" : "hover:bg-gray-300"}
                    transition-all`}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>

        <p className="text-orange-400 font-pixelify text-lg">
          {gameStatus === "won" && "¡Has ganado! 🎉"}
          {gameStatus === "lost" && `¡Perdiste! La palabra era: ${targetWord}`}
        </p>

        {(gameStatus === "won" || gameStatus === "lost") && (
          <button
            onClick={resetGame}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg
                     hover:bg-purple-700 transition-colors font-pixelify
                     drop-shadow-neon animate-bounce"
          >
            Jugar de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default WordleGame;