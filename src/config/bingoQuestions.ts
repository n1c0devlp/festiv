import { BingoCell } from '@/types/types';

export const bingoQuestions: BingoCell[] = [
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
  
  // Ajoutez vos nouvelles questions ici en suivant le même format :
  // { text: "Votre question ici", isChecked: false },
];

// Configuration optionnelle du bingo
export const bingoConfig = {
  // Nombre minimum de cases à cocher pour gagner
  winningCount: 5,
  
  // Taille de la grille (4x3 pour afficher les 12 questions)
  gridSize: {
    rows: 4,
    columns: 3
  },
  
  // Mélanger les questions au chargement ?
  shuffleOnLoad: true
}; 