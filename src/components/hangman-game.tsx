import { HangmanFigure } from "./hangman-stick-figure";

export const HangmanGame = () => {
  return (
    <div className="hangman-game-container min-h-100vh max-h-100vh flex flex-col items-center justify-between w-full h-screen">
      <nav className="w-full">
        <img alt="logo" className="h-14" src="src/assets/hangman-logo.svg" />
      </nav>

      <main className="flex-grow box-border w-full h-full px-10">
        <HangmanFigure />
      </main>

      <footer className="flex justify-end w-full">
        <p className="hangman-tagline uppercase text-lg tracking-widest text-white drop-shadow mb-2 px-4">
          One rope. One word.
        </p>
      </footer>
    </div>
  );
};
