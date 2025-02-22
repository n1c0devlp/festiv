import { GameQuestion } from '@/types/types';

export const categories = {
  VERITE: "🤔 Vérités",
  GAGE: "🎯 Gages",
  CULTURE: "📚 Culture Générale",
  GROUPE: "👥 Défis de Groupe",
  VOTE: "✋ Votes",
  DUEL: "⚔️ Duels",
  ALEATOIRE: "🎲 Mode Aléatoire",
  BOISSON: "🍻 Défis à Boire"
} as const;

type PicoloChallenge = {
  text: string;
  points?: number;
  players?: number; // nombre de joueurs requis (1 pour solo, 2 pour duel, etc.)
  timer?: number; // temps en secondes si nécessaire
};

const createQuestions = (category: string, challenges: PicoloChallenge[]): GameQuestion[] => {
  return challenges.map(({ text, points = 1, players = 1, timer }) => ({
    text: `${text}${points ? `\n\nPoints: ${points}` : ''}${timer ? `\nTemps: ${timer}s` : ''}`,
    category,
    isChecked: false,
    metadata: { points, players, timer }
  }));
};

export const picoloQuestions: GameQuestion[] = [
  // 🤔 Vérités
  ...createQuestions(categories.VERITE, [
    { text: "[Joueur], raconte ton pire moment de honte", points: 2 },
    { text: "[Joueur], quel est ton plus grand secret ?", points: 3 },
    { text: "[Joueur], quelle est la chose la plus folle que tu aies faite ?", points: 2 },
    { text: "[Joueur], quel est ton plus grand regret ?", points: 2 },
    { text: "[Joueur], quelle est ta plus grande peur ?", points: 1 }
  ]),

  // 🎯 Gages
  ...createQuestions(categories.GAGE, [
    { text: "[Joueur], imite une célébrité de ton choix", points: 2, timer: 30 },
    { text: "[Joueur], fais 10 pompes ou bois 3 gorgées", points: 3 },
    { text: "[Joueur], chante une chanson sans les paroles", points: 2, timer: 20 },
    { text: "[Joueur], envoie un message embarrassant à quelqu'un", points: 4 },
    { text: "[Joueur], fais un discours improvisé sur un sujet choisi par les autres", points: 3, timer: 45 }
  ]),

  // 📚 Culture Générale
  ...createQuestions(categories.CULTURE, [
    { text: "Qui peut citer le plus de capitales en 30 secondes ? Le perdant boit !", points: 3, timer: 30 },
    { text: "Premier à répondre : Quelle est la capitale du Kazakhstan ?", points: 2 },
    { text: "Tour de table : Citez un pays d'Afrique. Le premier qui répète ou ne trouve pas boit !", points: 2 },
    { text: "Question pour tous : Qui a peint la Joconde ? Dernier à répondre boit !", points: 1 },
    { text: "Défi culture : Citez 3 œuvres de Victor Hugo. Si vous échouez, buvez !", points: 3 }
  ]),

  // 👥 Défis de Groupe
  ...createQuestions(categories.GROUPE, [
    { text: "Tout le monde doit se lever et changer de place ! Dernier debout boit !", points: 1, players: 3 },
    { text: "Faites la chenille ! Le premier qui lâche boit double !", points: 3, players: 4, timer: 30 },
    { text: "Jeu du téléphone arabe ! Premier et dernier boivent si le message est différent !", points: 2, players: 4 },
    { text: "Tous en cercle ! Faites un pierre-feuille-ciseaux géant !", points: 2, players: 3 },
    { text: "Créez une chorégraphie en 30 secondes et exécutez-la !", points: 4, players: 2, timer: 30 }
  ]),

  // ✋ Votes
  ...createQuestions(categories.VOTE, [
    { text: "Votez pour la personne la plus susceptible de devenir président !", points: 2, players: 3 },
    { text: "Qui est le plus drôle du groupe ? La personne désignée distribue 3 gorgées !", points: 2, players: 3 },
    { text: "Qui arriverait le mieux à survivre à une apocalypse zombie ? Le gagnant fait boire 2 personnes !", points: 2, players: 3 },
    { text: "Qui est le plus sage du groupe ? Cette personne devient le juge pour les 3 prochains tours !", points: 3, players: 3 },
    { text: "Qui est le plus fêtard ? Cette personne doit inventer une règle pour le reste de la partie !", points: 3, players: 3 }
  ]),

  // ⚔️ Duels
  ...createQuestions(categories.DUEL, [
    { text: "[Joueur1] et [Joueur2], bataille de pouces ! Le perdant boit !", points: 2, players: 2 },
    { text: "[Joueur1] vs [Joueur2] : Pierre-feuille-ciseaux en 3 manches ! Le perdant boit à chaque défaite !", points: 3, players: 2 },
    { text: "[Joueur1] et [Joueur2], concours de grimaces ! Les autres votent pour le gagnant !", points: 2, players: 2 },
    { text: "[Joueur1] vs [Joueur2] : Quiz rapide ! Premier à 3 bonnes réponses gagne !", points: 4, players: 2 },
    { text: "[Joueur1] et [Joueur2], regardez-vous dans les yeux ! Premier qui rit boit !", points: 2, players: 2, timer: 30 }
  ]),

  // 🎲 Mode Aléatoire
  ...createQuestions(categories.ALEATOIRE, [
    { text: "Qui est le plus drôle du groupe ? La personne désignée distribue 3 gorgées !", points: 2, players: 3 },
    { text: "Qui arriverait le mieux à survivre à une apocalypse zombie ? Le gagnant fait boire 2 personnes !", points: 2, players: 3 },
    { text: "Qui est le plus sage du groupe ? Cette personne devient le juge pour les 3 prochains tours !", points: 3, players: 3 },
    { text: "Qui est le plus fêtard ? Cette personne doit inventer une règle pour le reste de la partie !", points: 3, players: 3 }
  ]),

  // 🍻 Défis à Boire
  ...createQuestions(categories.BOISSON, [
    { text: "[Joueur] boit une gorgée pour chaque voyelle dans son prénom", points: 1 },
    { text: "Les [Joueur1] et [Joueur2] font un concours de shots. Le perdant boit double !", points: 3, players: 2 },
    { text: "Tout le monde boit autant de gorgées que son âge divisé par 10 (arrondi au supérieur)", points: 2, players: 3 },
    { text: "Ceux qui ont leur téléphone en main boivent 2 gorgées", points: 1, players: 3 },
    { text: "[Joueur] invente une règle de boisson qui s'applique jusqu'au prochain défi", points: 2 },
    { text: "Le dernier à avoir bu de l'alcool distribue 5 gorgées", points: 2, players: 3 },
    { text: "Jeu du ciseau : [Joueur] pointe quelqu'un du doigt, cette personne boit et continue", points: 2, players: 4 },
    { text: "Waterfall ! [Joueur] commence et personne ne peut s'arrêter avant son voisin de droite", points: 3, players: 4 },
    { text: "Les fumeurs boivent 2 gorgées, les non-fumeurs en distribuent 2", points: 1, players: 3 },
    { text: "[Joueur] : Bois autant de gorgées que tu as de frères et sœurs + 1", points: 1 }
  ])
];

export const picoloConfig = {
  categories: Object.values(categories),
  winningCount: 10,
  shuffleOnLoad: true,
  displayMode: 'single' as const,
  randomMode: true
}; 