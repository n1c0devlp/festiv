import { Game } from '@/types/types';
import { bingoQuestions, bingoConfig } from './games/bingoQuestions';
import { neverHaveIEverQuestions, neverHaveIEverConfig } from './games/neverHaveIEver';

export const games: Game[] = [
  {
    id: 'gabingo',
    title: 'Gabingo',
    description: 'Le bingo des expressions de Gab !',
    icon: '👑',
    questions: bingoQuestions,
    config: bingoConfig
  },
  {
    id: 'never-have-i-ever',
    title: 'Je n\'ai jamais',
    description: 'Le jeu des confessions !',
    icon: '🤫',
    questions: neverHaveIEverQuestions,
    config: neverHaveIEverConfig
  }
]; 