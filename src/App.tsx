import { useState } from "react";
import "./App.css";
import WordleGame from "./pages/WordleGamePage";

function App() {
  return (
    <>
      <div className="bg-[url('/background.jpg')] bg-cover bg-center h-screen w-full overflow-x-hidden">
        <h1 className="text-7xl [text-shadow:_0_0_2px_#FF00FF] font-['Pixelify_Sans'] text-center hover:[text-shadow:_0_0_7px_#F400A1] bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 drop-shadow-lg group relative">
          WORDLE BY SERGIO
          <div
            className="h-1 w-0 bg-pink-400 absolute -bottom-2 left-1/2 
              group-hover:w-full group-hover:left-0 transition-all duration-300"
          ></div>
        </h1>

        <WordleGame />
      </div>
    </>
  );
}

export default App;
