import React, { useState, useEffect } from "react";
import WordleRow from "./WordleRow";

type Status = "correct" | "present" | "incorrect" | "";
type GameStatus = "playing" | "won" | "lost";

interface WordleGameProps {
  targetWord: string;
  validWords: string[];
  onGameEnd?: (won: boolean) => void;
  onNewWordRequested: () => void;
}

const WordleGame: React.FC<WordleGameProps> = ({ 
  targetWord, 
  validWords,
  onGameEnd, 
  onNewWordRequested 
}) => {
  const wordLength = targetWord.length;
  const MAX_ATTEMPTS = 6;

  const [guesses, setGuesses] = useState<string[][]>(
    Array(MAX_ATTEMPTS).fill([]).map(() => [])
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [validations, setValidations] = useState<Status[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [usedLetters, setUsedLetters] = useState<Record<string, Status>>({});
  const [invalidWord, setInvalidWord] = useState(false);

  useEffect(() => {
    setGuesses(Array(MAX_ATTEMPTS).fill([]).map(() => []));
    setCurrentRow(0);
    setValidations([]);
    setUsedLetters({});
    setGameStatus("playing");
  }, [targetWord]);

  const handleNewGame = () => {
    onNewWordRequested();
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      if (gameStatus !== "playing") return;
      
      const currentGuess = [...guesses[currentRow]];
      
      if (key === "ENTER") {
        if (currentGuess.length === wordLength) {
          const guessedWord = currentGuess.join("").toUpperCase();
          
          if (!validWords.includes(guessedWord)) {
            triggerShakeAnimation();
            setInvalidWord(true);
            setTimeout(() => setInvalidWord(false), 1000);
            return;
          }
          
          validateGuess(currentGuess);
        } else {
          triggerShakeAnimation();
        }
      } else if (key === "BACKSPACE") {
        if (currentGuess.length > 0) {
          const newGuess = currentGuess.slice(0, -1);
          setGuesses(prev => prev.map((g, i) => i === currentRow ? newGuess : g));
        }
      } else if (/^[A-Z]$/.test(key)) {
        if (currentGuess.length < wordLength) {
          const newGuess = [...currentGuess, key];
          setGuesses(prev => prev.map((g, i) => i === currentRow ? newGuess : g));
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentRow, gameStatus, guesses, wordLength, validWords]);

  const validateGuess = (guess: string[]) => {
    const validation = guess.map((letter, index) => {
      let status: Status = "incorrect";
      if (letter === targetWord[index]) {
        status = "correct";
      } else if (targetWord.includes(letter)) {
        status = "present";
      }
      
      setUsedLetters(prev => ({
        ...prev,
        [letter]: prev[letter] === "correct" ? "correct" : status
      }));
      
      return status;
    });

    setValidations(prev => [...prev, validation]);

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

  return (
    <div className="flex flex-col items-center gap-6 p-4 font-['Pixelify_Sans']">
      <div className="flex flex-col gap-2 text-cyan-400 drop-shadow-neon">
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
            <div key={i} className="flex justify-center gap-1 text-green-400 drop-shadow-neon">
              {row.split("").map(letter => (
                <button
                  key={letter}
                  onClick={() => {
                    if (gameStatus !== "playing") return;
                    const newGuess = [...guesses[currentRow]];
                    if (newGuess.length < wordLength) {
                      newGuess.push(letter);
                      setGuesses(prev => prev.map((g, i) => i === currentRow ? newGuess : g));
                    }
                  }}
                  className={`w-8 h-10 flex items-center justify-center rounded
                    ${usedLetters[letter] 
                      ? `text-white ${usedLetters[letter] === "correct" ? "bg-green-500" 
                         : usedLetters[letter] === "present" ? "bg-yellow-500" 
                         : "bg-gray-600"}` 
                      : "bg-gray-200"}
                    ${gameStatus !== "playing" ? "opacity-50" : "hover:bg-gray-300"}
                    transition-all`}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-orange-400 font-pixelify text-lg">
            {gameStatus === "won" && "¡Has ganado! 🎉"}
            {gameStatus === "lost" && `¡Perdiste! La palabra era: ${targetWord}`}
          </p>
          {invalidWord && (
            <p className="text-red-400 font-pixelify text-lg animate-pulse">
              ¡Palabra no válida!
            </p>
          )}
        </div>

        <button
          onClick={handleNewGame}
          className={`px-6 py-2 text-white rounded-lg transition-colors font-pixelify
            ${gameStatus === "playing" 
              ? "bg-blue-600 hover:bg-blue-700" 
              : "bg-purple-600 hover:bg-purple-700 animate-bounce"
            }
            drop-shadow-neon`}
        >
          {gameStatus === "playing" ? "Nueva palabra" : "Jugar de nuevo"}
        </button>
      </div>
    </div>
  );
};

export default WordleGame;