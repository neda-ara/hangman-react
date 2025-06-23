import { HangmanStickFigure } from "./hangman-stick-figure";

export const HangmanGame = () => {
  return (
    <div className="min-h-100vh max-h-100vh">
      <img alt="logo" className="h-15" src="src/assets/hangman-logo.svg" />
      <HangmanStickFigure />
    </div>
  );
};
