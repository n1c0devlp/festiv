import { Game } from '@/types/types';
import { bingoQuestions, bingoConfig } from './games/bingoQuestions';
import { neverHaveIEverQuestions, neverHaveIEverConfig } from './games/neverHaveIEver';
import { cardGamesQuestions, cardGamesConfig } from './games/cardGames';
import { quizQuestions, quizConfig } from './games/quizQuestions';
import { truthOrDareQuestions, truthOrDareConfig } from './games/truthOrDareQuestions';
import { drinkingCardsQuestions, drinkingCardsConfig } from './games/drinkingCardsQuestions';
import { picoloQuestions, picoloConfig } from './games/picoloQuestions';

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
  },
  {
    id: 'quiz',
    title: 'Quiz à Boire',
    description: 'Testez vos connaissances... ou buvez !',
    icon: '🎯',
    questions: quizQuestions,
    config: quizConfig
  },
  {
    id: 'truth-or-dare',
    title: 'Vérité ou Action',
    description: 'Révélez vos secrets ou relevez des défis !',
    icon: '🎲',
    questions: truthOrDareQuestions,
    config: truthOrDareConfig
  },
  {
    id: 'drinking-cards',
    title: 'Cartes à Boire',
    description: 'Un jeu de cartes avec des règles pour boire !',
    icon: '🎴',
    questions: drinkingCardsQuestions,
    config: drinkingCardsConfig
  },
  {
    id: 'card-games',
    title: 'Jeux de Cartes',
    description: 'Les règles des meilleurs jeux de cartes !',
    icon: '🃏',
    questions: cardGamesQuestions,
    config: cardGamesConfig
  },
  {
    id: 'picolo',
    title: 'Picolo',
    description: 'Un jeu de défis et de questions pour animer vos soirées ! Inspiré du célèbre jeu Picolo, ce jeu propose des défis variés, des questions embarrassantes et des actions amusantes.',
    icon: '🎲',
    questions: picoloQuestions,
    config: picoloConfig,
  },
]; 