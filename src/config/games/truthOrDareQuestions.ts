import { GameQuestion } from '@/types/types';

export const categories = {
  VERITE_LEGER: "😊 Vérités Légères",
  VERITE_MOYEN: "🤔 Vérités Moyennes",
  VERITE_HOT: "🔥 Vérités Hot",
  ACTION_LEGER: "🎮 Actions Légères",
  ACTION_MOYEN: "🎯 Actions Moyennes",
  ACTION_HOT: "🌶️ Actions Hot"
} as const;

const createQuestions = (category: string, questions: string[]): GameQuestion[] => {
  return questions.map(text => ({
    text,
    category,
    isChecked: false
  }));
};

export const truthOrDareQuestions: GameQuestion[] = [
  // 😊 Vérités Légères
  ...createQuestions(categories.VERITE_LEGER, [
    "Quel est ton plus grand mensonge ?",
    "Quelle est ta plus grande peur ?",
    "Quel est ton plus grand rêve ?",
    "As-tu déjà triché à un examen ?",
    "Quel est ton plus grand regret ?",
    "Quelle est ta plus grande fierté ?",
    "As-tu déjà volé quelque chose ?",
    "Quel est ton plus grand secret ?",
    "Quelle est ta plus grande honte ?",
    "As-tu déjà menti à tes parents ?"
  ]),

  // 🤔 Vérités Moyennes
  ...createQuestions(categories.VERITE_MOYEN, [
    "Qui est la dernière personne que tu as stalkée sur les réseaux ?",
    "Quel est ton plus gros crush actuel ?",
    "Quelle est la chose la plus folle que tu aies faite en soirée ?",
    "As-tu déjà eu des sentiments pour le/la partenaire d'un(e) ami(e) ?",
    "Quel est le pire mensonge que tu aies dit à un(e) ex ?",
    "As-tu déjà trahi la confiance de quelqu'un ?",
    "Quelle est la chose la plus embarrassante que tu aies faite en public ?",
    "As-tu déjà eu un crush sur un(e) prof ?",
    "Quel est ton plus grand fantasme ?",
    "As-tu déjà été infidèle ?"
  ]),

  // 🔥 Vérités Hot
  ...createQuestions(categories.VERITE_HOT, [
    "Quel est ton plus grand fantasme inavoué ?",
    "Quelle est ta plus grande expérience sexuelle ?",
    "As-tu déjà eu une aventure d'un soir ?",
    "Quel est l'endroit le plus insolite où tu as fait l'amour ?",
    "As-tu déjà eu des sentiments pour plusieurs personnes en même temps ?",
    "Quelle est ta plus grande expérience sensuelle ?",
    "As-tu déjà envoyé des photos coquines ?",
    "Quel est ton plus grand secret intime ?",
    "As-tu déjà eu une expérience avec quelqu'un du même sexe ?",
    "Quelle est ta plus grande transgression ?"
  ]),

  // 🎮 Actions Légères
  ...createQuestions(categories.ACTION_LEGER, [
    "Fais 10 pompes",
    "Imite un animal pendant 30 secondes",
    "Chante une chanson de ton choix",
    "Danse pendant une minute",
    "Fais le tour de la pièce à cloche-pied",
    "Raconte une blague",
    "Fais un compliment à chaque joueur",
    "Fais une grimace et garde-la pendant 30 secondes",
    "Fais semblant d'être une statue pendant 1 minute",
    "Imite une célébrité"
  ]),

  // 🎯 Actions Moyennes
  ...createQuestions(categories.ACTION_MOYEN, [
    "Appelle quelqu'un et chante-lui 'Joyeux Anniversaire'",
    "Envoie un message embarrassant à quelqu'un",
    "Poste une photo gênante sur tes réseaux",
    "Mange un mélange d'aliments choisis par les autres joueurs",
    "Laisse les autres joueurs te maquiller les yeux bandés",
    "Fais un discours improvisé de 2 minutes",
    "Imite tous les autres joueurs",
    "Fais un lap dance à un objet",
    "Laisse quelqu'un te coiffer comme il veut",
    "Fais un karaoké sur une chanson choisie par les autres"
  ]),

  // 🌶️ Actions Hot
  ...createQuestions(categories.ACTION_HOT, [
    "Fais un strip-tease (garde tes sous-vêtements)",
    "Embrasse la personne de ton choix",
    "Fais un massage de 2 minutes à quelqu'un",
    "Montre ton plus beau déhanché",
    "Mime une scène sensuelle",
    "Fais un slow avec la personne de ton choix",
    "Donne un suçon à quelqu'un",
    "Fais un body shot",
    "Embrasse quelqu'un dans le cou",
    "Fais un lap dance à quelqu'un"
  ])
];

export const truthOrDareConfig = {
  categories: Object.values(categories),
  shuffleOnLoad: true,
  winningCount: 5
}; 