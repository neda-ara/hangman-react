import { GameWords } from "../utils/word-bank";
import { HangmanFigure } from "./hangman-figure";
import { useEffect, useRef, useState } from "react";
import { useRandomWord } from "../hooks/useRandomWord";
import { WordArea } from "./word-area";
import type { WordWithCategory } from "../utils/types";

export const HangmanGame = () => {
  const { getNextWord } = useRandomWord(GameWords);

  const [attempt, setAttempt] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordWithCategory | null>(null);
  const [incorrectGuessCount, setIncorrectGuessCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const hasInitializedAttempt = useRef(false);

  const handleNextWord = () => {
    const word = getNextWord(attempt);
    setCurrentWord(word);
    setAttempt((a) => a + 1);
  };

  useEffect(() => {
    if (!hasInitializedAttempt.current) {
      handleNextWord();
      hasInitializedAttempt.current = true;
    }
  }, []);

  return (
    <div className="relative hangman-game-container min-h-100vh max-h-100vh flex flex-col items-center justify-between w-full h-screen">
      <nav className="w-full flex justify-between items-center">
        <img
          alt="logo"
          className="h-14 max-480:h-10"
          src="src/assets/hangman-logo.svg"
        />
        <div className="pr-4 flex items-center gap-4">
          <div className="font-creepster text-white tracking-widest text-xl max-480:text-lg font-medium">
            Grave Call: {attempt}
          </div>
          <div className="flex items-center">
            <img
              alt="score"
              className="h-12 max-480:h-10"
              src="src/assets/noose.svg"
            />
            <p className="font-creepster text-white text-2xl max-480:text-xl m-0 font-medium">
              {score}
            </p>
          </div>
        </div>
      </nav>

      <main className="flex flex-grow box-border w-full h-full px-10 max-1024:px-6 max-768:px-4 max-1024:flex-col max-480:px-2">
        <div className="flex items-center justify-center w-1/2 max-1024:w-full max-1024:h-3/4">
          <HangmanFigure incorrectGuessCount={incorrectGuessCount} />
        </div>
        <div className="w-1/2 h-full max-1024:w-full max-1024:h-1/4 max-1024:-translate-y-10">
          <WordArea
            currentWord={currentWord}
            handleNextWord={handleNextWord}
            incorrectGuessCount={incorrectGuessCount}
            setIncorrectGuessCount={setIncorrectGuessCount}
            setAttempt={setAttempt}
            score={score}
            setScore={setScore}
          />
        </div>
      </main>

      <footer className="flex justify-end w-full">
        <p className="font-creepster uppercase text-lg max-480:text-sm tracking-widest text-white drop-shadow mb-2 px-4">
          One rope. One word.
        </p>
      </footer>
    </div>
  );
};
