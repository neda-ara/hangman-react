import { DIFFICULTY_SCORE, KEYBOARD_LETTERS } from "../utils/constants";
import { getDifficultyClass } from "../utils/helpers";
import { useEffect, useState } from "react";
import Modal from "./modal";
import type { UsedKey, WordWithCategory } from "../utils/types";

interface WordAreaProps {
  currentWord: WordWithCategory | null;
  incorrectGuessCount: number;
  setIncorrectGuessCount: any;
  setAttempt: any;
  score: number;
  setScore: any;
  handleNextWord: () => void;
}

export const WordArea = ({
  currentWord,
  handleNextWord,
  incorrectGuessCount,
  setIncorrectGuessCount,
  setAttempt,
  score,
  setScore,
}: WordAreaProps) => {
  const [disabledKeys, setDisabledKeys] = useState<UsedKey[]>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const correctLetters = disabledKeys
    .filter((key) => key.isCorrectGuess)
    .map((key) => key.key.toUpperCase());

  const shouldDisplayLetter = (letter: string) => {
    return correctLetters.includes(letter.toUpperCase());
  };

  const handleKeyClick = (letter: string) => {
    if (!currentWord) {
      return;
    }

    const wordLetters = currentWord.word.toUpperCase().split("");
    const isCorrectGuess = wordLetters.includes(letter.toUpperCase());

    if (!isCorrectGuess) {
      setIncorrectGuessCount((prev: number) => prev + 1);
    }

    if (!disabledKeys.some((k) => k.key === letter)) {
      setDisabledKeys((prev) => [
        ...prev,
        { key: letter.toUpperCase(), isCorrectGuess },
      ]);
    }
  };

  const checkGameOver = (): {
    over: boolean;
    result: "win" | "lose" | null;
  } => {
    if (incorrectGuessCount >= 6) {
      return { over: true, result: "lose" };
    }

    if (currentWord) {
      const wordLetters = currentWord.word.toUpperCase().split("");
      const allLettersGuessed = wordLetters.every((letter) =>
        correctLetters.includes(letter)
      );

      if (allLettersGuessed) {
        return { over: true, result: "win" };
      }
    }

    return { over: false, result: null };
  };

  useEffect(() => {
    if (gameFinished || !currentWord) return;

    const { over, result } = checkGameOver();
    if (over) {
      setModalOpen(true);
      setGameFinished(true);

      if (result === "win") {
        setScore((prev: number) => {
          let wordScore =
            DIFFICULTY_SCORE[
              currentWord.difficulty.toUpperCase() as keyof typeof DIFFICULTY_SCORE
            ];
          return prev + (showHint ? wordScore / 2 : wordScore);
        });
      }
    }
  }, [disabledKeys, incorrectGuessCount, currentWord]);

  const handleGameOver = () => {
    const { result } = checkGameOver();

    if (result === "lose") {
      setAttempt(0);
      setScore(0);
    }

    handleNextWord();
    setIncorrectGuessCount(0);
    setDisabledKeys([]);
    setShowHint(false);
    setModalOpen(false);
    setGameFinished(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      if (openModal && event.key === "Enter") {
        handleGameOver();
        return;
      }

      if (/^[A-Z]$/.test(key)) {
        if (!disabledKeys.some((k) => k.key === key)) {
          handleKeyClick(key);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [disabledKeys, currentWord, openModal]);

  const getDisabledKeyClass = (letter: string) => {
    const keyObj = disabledKeys.find((k) => k.key === letter.toUpperCase());
    if (!keyObj) return "";
    return keyObj.isCorrectGuess
      ? "keyboard-btn-disabled success"
      : "keyboard-btn-disabled error";
  };

  const isGameWon = checkGameOver()?.result === "win";

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full gap-y-6">
        <div className="flex flex-col">
          <div className="category-badge flex items-center justify-center self-center gap-0.75 px-2 py-1 mb-3 rounded-full max-w-fit shadow-md">
            <span className="text-xl">{currentWord?.categoryIcon}</span>
            <span className="font-nunito text-xs tracking-wide text-white inline translate-y-0.5">
              {currentWord?.categoryName}
            </span>
          </div>
          <div
            className={`.difficulty-badge px-3 py-1 self-center rounded-full text-xs font-bold text-white shadow-md text-center tracking-wide font-inter 
            ${getDifficultyClass(currentWord?.difficulty)}`}
          >
            {currentWord?.difficulty?.toUpperCase()}
          </div>
          <div className="flex items-center gap-x-4 self-center my-2">
            {currentWord?.word
              ?.split("")
              ?.map((letter: string, idx: number) => (
                <div
                  key={idx}
                  className="font-inter font-medium text-white text-5xl border-b-3.5 border-b-solid border-white pb-2 outline-none"
                >
                  <span
                    className={`${
                      shouldDisplayLetter(letter) ? "visible" : "invisible"
                    }`}
                  >
                    {letter.toLocaleUpperCase()}
                  </span>
                </div>
              ))}
          </div>

          <div
            className={`hint-container self-center transition-all duration-250 ease-in-out ${
              !showHint && "cursor-pointer hover:scale-105"
            }`}
          >
            <div
              onClick={() => setShowHint(true)}
              className={`hint-button max-w-fit outline-none ${
                showHint
                  ? "expanded rounded-sm p-2"
                  : "p-1 transition-all duration-500 ease-in-out"
              } text-sm tracking-wide`}
            >
              {showHint ? (
                <span className="font-mansalva text-lg italic hint-text tracking-wider">
                  {currentWord?.hint}
                </span>
              ) : (
                <span className="font-creepster font-light tracking-0.625 gap-x-1 pr-1 text-lg">
                  <span className="text-lg">💡</span>Get Hint
                </span>
              )}
            </div>
          </div>
        </div>

        {/* KEYBOARD */}
        <div className="flex flex-col items-center justify-center z-5">
          {Object.values(KEYBOARD_LETTERS).map(
            (row: string, rowIndex: number) => (
              <div
                key={rowIndex}
                className={`flex justify-center mb-1 gap-x-2 ${
                  rowIndex === 1 ? "ml-4" : rowIndex === 2 ? "ml-8" : ""
                }`}
              >
                {row.split("").map((letter) => (
                  <button
                    key={letter}
                    type="button"
                    className={`keyboard-button font-inter font-semibold text-lg ${getDisabledKeyClass(
                      letter
                    )}`}
                    aria-label={`Keyboard letter ${letter}`}
                    onClick={() => handleKeyClick(letter)}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* WIN/LOSE MODAL */}
      <Modal isOpen={openModal}>
        <div className="relative flex flex-col pt-10">
          <div className="absolute self-center top-0">
            <img
              alt="logo"
              className="h-14"
              src={`src/assets/${isGameWon ? "party-hat" : "grave"}.svg`}
            />
          </div>

          <div
            className={`${
              isGameWon ? "bg-wall-textured" : "bg-wall-bloody"
            } px-16 py-6 rounded-t-xl flex flex-col items-center justify-center`}
          >
            <div className="flex flex-col items-center justify-center">
              <span
                className={`text-lg ${
                  isGameWon
                    ? "font-macondo tracking-wider font-bold text-green-600"
                    : "font-creepster tracking-widest text-red-800"
                }`}
              >
                {isGameWon
                  ? "Your neck lives to guess again"
                  : "You answered the final call"}
              </span>
            </div>
            <div className="relative flex w-full itmes-center justify-center my-3">
              <img
                alt="logo"
                className="h-36"
                src={`src/assets/${isGameWon ? "gallows" : "hanged-man"}.svg`}
              />
              <img
                alt="logo"
                className="absolute h-14 bottom-1 right-0 scale-x--100"
                src={`src/assets/${isGameWon ? "happy-man" : "reaper"}.svg`}
              />
            </div>
            <div className="text-center mb-3">
              <span
                className={`${
                  isGameWon
                    ? "font-macondo font-semibold text-victory-blue"
                    : "font-creepster text-blood-stained"
                } text-4xl mr-1`}
              >
                {score}
              </span>
              <span className="font-mansalva text-sm font-bold">pts</span>
            </div>
            <button
              onClick={handleGameOver}
              className={`${
                isGameWon ? "btn-green" : "btn-red"
              } font-macondo text-lg tracking-wider`}
            >
              {isGameWon ? "Next Trial" : "Retry Your Fate"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
