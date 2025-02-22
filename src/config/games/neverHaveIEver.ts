import { categories, neverHaveIEverQuestions } from './neverHaveIEverQuestions';

export const neverHaveIEverConfig = {
  winningCount: 10,
  displayMode: 'single' as const,
  shuffleOnLoad: true,
  categories: Object.values(categories)
};

export { neverHaveIEverQuestions, categories }; 