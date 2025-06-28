export interface Word {
  word: string;
  hint: string;
  difficulty: string;
}

export interface Category {
  label: string;
  icon: string;
  words: Word[];
}

export interface WordBank {
  [category: string]: Category;
}

export interface WordWithCategory extends Word {
  category: string;
  categoryIcon: string;
  categoryName: string;
}

export interface UsedKey {
  key: string;
  isCorrectGuess: boolean;
}
