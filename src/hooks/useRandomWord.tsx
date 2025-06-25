import { useState } from "react";
import type { WordBank, WordWithCategory } from "../utils/types";
import { pickDifficultyByAttempt, randomIndex } from "../utils/helpers";

export function useRandomWord(wordBank: WordBank) {
  const allWords: WordWithCategory[] = [];

  for (const categoryKey in wordBank) {
    const category = wordBank[categoryKey];
    category.words.forEach((wordObj) =>
      allWords.push({ ...wordObj, category: categoryKey })
    );
  }

  const [usedIndexes, setUsedIndexes] = useState<Set<number>>(new Set());

  const getAvailableWords = (difficultyLevels: string[]) =>
    allWords.filter(
      (_, idx) =>
        difficultyLevels.includes(allWords[idx].difficulty) &&
        !usedIndexes.has(idx)
    );

  const getNextWord = (attempt: number = 1): WordWithCategory | null => {
    let chosenDifficulty = pickDifficultyByAttempt(attempt);
    let candidates = getAvailableWords([chosenDifficulty]);

    if (candidates.length === 0) {
      // fallback: pick any remaining words regardless of difficulty
      candidates = allWords.filter((_, idx) => !usedIndexes.has(idx));
    }

    if (candidates.length === 0) {
      return null;
    }

    const pick = candidates[randomIndex(candidates.length)];

    const wordIndex = allWords.findIndex(
      (w) =>
        w.word === pick.word &&
        w.category === pick.category &&
        w.difficulty === pick.difficulty
    );

    setUsedIndexes((prev) => new Set(prev).add(wordIndex));
    return pick;
  };

  return { getNextWord };
}
