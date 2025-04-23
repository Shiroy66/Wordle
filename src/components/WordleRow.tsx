import React from "react";

type Status = "correct" | "present" | "incorrect" | "";

interface WordleRowProps {
  wordLength: number;
  letters: string[];
  currentPosition: number;
  statuses: Status[];
  validated: boolean;
  className?: string;
}

const WordleRow: React.FC<WordleRowProps> = ({
  wordLength,
  letters,
  currentPosition,
  statuses,
  validated,
  className,
}) => {
  const getStatusClasses = (status: Status) => {
    switch (status) {
      case "correct":
        return "bg-green-500 rounded-lg p-6 border-transparent shadow-[0px_0px_10px_3px_green]";
      case "present":
        return "bg-yellow-600 rounded-lg p-6 border-transparent shadow-[0px_0px_10px_3px_yellow]";
      case "incorrect":
        return "bg-red-900 rounded-lg p-6 border-transparent shadow-[0px_0px_10px_3px_red]";
      default:
        return "";
    }
  };

  return (
    <div className={`flex gap-2 ${className || ""}`}>
      {Array(wordLength)
        .fill(null)
        .map((_, index) => {
          const letter = letters[index] || "";
          const status = statuses[index] || "";
          const isActive = index === currentPosition && !validated;

          return (
            <div
              key={index}
              className={`w-10 h-10 border-2 flex items-center justify-center text-2xl
                font-bold uppercase transition-all duration-300
                ${
                  validated
                    ? getStatusClasses(status)
                    : "bg-gray-900 rounded-lg p-6 border-2 border-transparent shadow-[0_0_5px_2px]"
                }
                ${validated ? "text-white" : ""}
                ${
                  isActive
                    ? "inset-0 rounded-lg border-2 bg-radial from-pink-500 to-cyan-500 blur-[1px]"
                    : ""
                }
                ${!letter ? "opacity-75" : ""}`}
            >
              {letter || "\u00A0"}
            </div>
          );
        })}
    </div>
  );
};

export default WordleRow;