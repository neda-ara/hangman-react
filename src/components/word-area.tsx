import type { WordWithCategory } from "../utils/types";

interface WordAreaProps {
  currentWord: WordWithCategory | null;
}

const KEYBOARD_LETTERS = {
  FIRST_ROW: "QWERTYUIOP",
  SECOND_ROW: "ASDFGHJKL",
  THIRD_ROW: "ZXCVBNM",
};

export const WordArea = ({ currentWord }: WordAreaProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-y-10">
      <div className="flex items-center gap-x-4">
        {currentWord?.word?.split("")?.map((letter: string, idx: number) => (
          <span
            key={idx}
            className="font-semibold text-white text-4xl border-b-3.5 border-b-solid border-white pb-2 select-none outline-none"
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="flex flex-col items-center select-none">
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
                  className="keyboard-button font-semibold text-lg"
                  aria-label={`Keyboard letter ${letter}`}
                  onClick={() => console.log(letter)}
                >
                  {letter}
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};
