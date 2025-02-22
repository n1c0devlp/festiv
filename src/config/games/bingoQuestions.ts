import { GameQuestion } from '@/types/types';

export const bingoQuestions: GameQuestion[] = [
  { text: "Mais non, c'est pas vrai !", isChecked: false },
  { text: "Ah ouais ?", isChecked: false },
  { text: "*rire nerveux*", isChecked: false },
  { text: "Dévisage tout le monde à la recherche de la vérité", isChecked: false },
  { text: "Non mais attends...", isChecked: false },
  { text: "C'est une blague ? C'est pas possible !", isChecked: false },
  { text: "**Tire sur sa CE**", isChecked: false },
  { text: "*Équarquille les yeux*", isChecked: false },
  { text: "Mais Marina, t'es lesbienne !", isChecked: false },
  { text: "QUOI ?!", isChecked: false },
  { text: "T'avais pas un contact pour de la beuh?", isChecked: false },
  { text: "*Sourire gêné*", isChecked: false },
];

export const bingoConfig = {
  winningCount: 5,
  displayMode: 'grid' as const,
  shuffleOnLoad: true
}; 