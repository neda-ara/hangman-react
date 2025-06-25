import { GameWords } from "../utils/word-bank";
import { HangmanFigure } from "./hangman-figure";
import { useEffect, useState } from "react";
import { useRandomWord } from "../hooks/useRandomWord";
import type { WordWithCategory } from "../utils/types";

export const HangmanGame = () => {
  const { getNextWord } = useRandomWord(GameWords);

  const [attempt, setAttempt] = useState(1);
  const [currentWord, setCurrentWord] = useState<WordWithCategory | null>(null);

  const handleNextWord = () => {
    const word = getNextWord(attempt);
    if (word) {
      setCurrentWord(word);
      setAttempt((a) => a + 1);
    } else {
      alert("No more words left!");
    }
  };

  useEffect(() => {
    handleNextWord();
  }, []);

  return (
    <div className="hangman-game-container min-h-100vh max-h-100vh flex flex-col items-center justify-between w-full h-screen">
      <nav className="w-full">
        <img alt="logo" className="h-14" src="src/assets/hangman-logo.svg" />
      </nav>

      <main className="flex-grow box-border w-full h-full px-10">
        <HangmanFigure />
        <h1 className="text-white text-xl">{currentWord?.word}</h1>
      </main>

      <footer className="flex justify-end w-full">
        <p className="hangman-tagline uppercase text-lg tracking-widest text-white drop-shadow mb-2 px-4">
          One rope. One word.
        </p>
      </footer>
    </div>
  );
};
