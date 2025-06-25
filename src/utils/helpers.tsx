import { DIFFICULTY_LEVEL } from "./constants";

export function pickDifficultyByAttempt(attempt: number): string {
  const r = Math.random();
  if (attempt <= 3) {
    if (r < 0.7) return DIFFICULTY_LEVEL.EASY;
    else if (r < 0.95) return DIFFICULTY_LEVEL.MEDIUM;
    else return DIFFICULTY_LEVEL.HARD;
  } else if (attempt <= 6) {
    if (r < 0.6) return DIFFICULTY_LEVEL.MEDIUM;
    else if (r < 0.85) return DIFFICULTY_LEVEL.EASY;
    else return DIFFICULTY_LEVEL.HARD;
  } else {
    if (r < 0.7) return DIFFICULTY_LEVEL.HARD;
    else if (r < 0.9) return DIFFICULTY_LEVEL.MEDIUM;
    else return DIFFICULTY_LEVEL.EASY;
  }
}

export function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}
