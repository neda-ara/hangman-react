export const HangmanFigure = () => {
  const HANGMAN = [HEAD, BODY, LEFT_ARM, RIGHT_ARM, RIGHT_LEG, LEFT_LEG];

  return (
    <div className="relative flex justify-center w-full h-full max-h-300">
      {HANGMAN.map((bodyParts) => bodyParts)}

      <div className="hangman-rope absolute h-20 top-0.9/10 left-[calc((100%-20rem)/2)+10rem] w-2.5 bg-gray-200 z-3" />
      <div className="hangman-topbar absolute top-0.9/10 left-[calc((100%-20rem)/2)] h-2.5 w-40 bg-gray-200 self-end z-2" />
      <div className="hangman-upright absolute h-9/10 w-2.5 left-[calc((100%-20rem)/2)] bg-gray-200 self-end" />
      <div className="hangman-base h-2.5 w-80 bg-gray-200 self-end z-2 mx-auto" />
    </div>
  );
};

const HEAD = (
  <div className="hangman-head absolute top-25 left-[calc((100%-20rem)/2)+10rem] h-18 aspect-1 bg-white rounded-full z-4" />
);

const BODY = (
  <div className="hangman-body absolute top-40 left-[calc((100%-20rem)/2)+10rem] w-24 h-36 mx-auto rounded-t-[35%] rounded-b-[20%] z-3" />
);

const LEFT_ARM = (
  <div className="hangman-arm-left absolute top-43 left-[calc(((100%-20rem)/2)+7.625rem)] w-7 h-35 rounded-full origin-top-left z-2" />
);

const RIGHT_ARM = (
  <div className="hangman-arm-right absolute top-43 left-[calc(((100%-20rem)/2)+10.575rem)] w-7 h-35 rounded-full origin-top-right z-2" />
);

const RIGHT_LEG = (
  <div className="hangman-leg-right absolute w-10 h-40 rounded-b-full top-70 left-[calc(((100%-20rem)/2)+7.5rem)]" />
);

const LEFT_LEG = (
  <div className="hangman-leg-left absolute w-10 h-40 rounded-b-full top-70 left-[calc(((100%-20rem)/2)+9.625rem)]" />
);
