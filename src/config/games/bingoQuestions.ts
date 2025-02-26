import { GameQuestion } from '@/types/types';

// Fonction pour mélanger un tableau
const shuffleArray = (array: GameQuestion[]): GameQuestion[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Questions pour chaque catégorie
export const gabingoQuestions: GameQuestion[] = [
  { text: "Mais non, c'est pas vrai !", isChecked: false },
  { text: "Ah ouais ?", isChecked: false },
  { text: "*rire nerveux*", isChecked: false },
  { text: "Dévisage tout le monde à la recherche de la vérité", isChecked: false },
  { text: "Non mais attends...", isChecked: false },
  { text: "C'est une blague ? C'est pas possible !", isChecked: false },
  { text: "*Tire sur sa CE*", isChecked: false },
  { text: "*Équarquille les yeux*", isChecked: false },
  { text: "Mais Marina, t'es lesbienne !", isChecked: false },
  { text: "QUOI ?!", isChecked: false },
  { text: "T'avais pas un contact pour de la beuh?", isChecked: false },
  { text: "*Sourire gêné*", isChecked: false },
];

export const adingoQuestions: GameQuestion[] = [
  { text: "Oh frère, c'est pas...", isChecked: false },
  { text: "*Équarquille les yeux*", isChecked: false },
  { text: "Wesh !", isChecked: false },
  { text: "Mais t'es sérieux ?", isChecked: false },
  { text: "*Se roule une clope*", isChecked: false },
  { text: "*Fait couler sa bière*", isChecked: false },
  { text: "Can I get a OHHH YEAH?", isChecked: false },
  { text: "*Se roule une clope*", isChecked: false },
  { text: "*Rote*", isChecked: false },  
];
export const lucingoQuestions: GameQuestion[] = [];
export const bincoQuestions: GameQuestion[] = [];
export const clemingoQuestions: GameQuestion[] = [];

// Configuration pour chaque type de bingo
const createBingoConfig = (title: string) => ({
  winningCount: 5,
  displayMode: 'grid' as const,
  shuffleOnLoad: true,
  title: title
});

export const bingoConfigs = {
  gabingo: createBingoConfig('Gabingo'),
  adingo: createBingoConfig('Adingo'),
  lucingo: createBingoConfig('Lucingo'),
  binco: createBingoConfig('Binco'),
  clemingo: createBingoConfig('Clemingo')
};

// Export des questions mélangées pour chaque catégorie
export const getBingoQuestions = (type: keyof typeof bingoConfigs) => {
  const questionsMap = {
    gabingo: gabingoQuestions,
    adingo: adingoQuestions,
    lucingo: lucingoQuestions,
    binco: bincoQuestions,
    clemingo: clemingoQuestions
  };
  
  return shuffleArray(questionsMap[type]);
}; 