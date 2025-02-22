import { GameQuestion } from '@/types/types';

export const categories = {
  CLASSIQUE: "🎴 Jeu Classique",
  SPECIAL: "✨ Règles Spéciales",
  DEFIS: "🎯 Défis",
  THEMES: "🎨 Thématiques",
  EQUIPE: "👥 Équipes",
  HISTOIRE: "📖 Histoire Continue"
} as const;

const createQuestions = (category: string, questions: { card: string, rule: string }[]): GameQuestion[] => {
  return questions.map(({ card, rule }) => ({
    text: `${card}\n${rule}`,
    category,
    isChecked: false
  }));
};

export const drinkingCardsQuestions: GameQuestion[] = [
  // 🎴 Jeu Classique
  ...createQuestions(categories.CLASSIQUE, [
    {
      card: "🎴 As",
      rule: "Cascade : Le joueur commence à boire, puis chaque joueur suivant commence quand son voisin de droite a commencé. On ne peut s'arrêter que quand son voisin de droite s'est arrêté."
    },
    {
      card: "🎴 2",
      rule: "Tu bois : Désigne un joueur qui doit boire 2 gorgées."
    },
    {
      card: "🎴 3",
      rule: "Je bois : Le joueur qui tire la carte boit 3 gorgées."
    },
    {
      card: "🎴 4",
      rule: "Au sol : Le dernier à mettre un genou au sol boit 4 gorgées."
    },
    {
      card: "🎴 5",
      rule: "Les gars : Tous les hommes boivent 2 gorgées."
    },
    {
      card: "🎴 6",
      rule: "Les filles : Toutes les femmes boivent 2 gorgées."
    },
    {
      card: "🎴 7",
      rule: "Ciel : Le dernier à lever la main boit 2 gorgées."
    },
    {
      card: "🎴 8",
      rule: "Mate : Choisis un partenaire qui boira à chaque fois que tu bois."
    },
    {
      card: "🎴 9",
      rule: "Rime : Dis un mot, chacun doit trouver une rime. Le premier qui ne trouve pas boit 3 gorgées."
    },
    {
      card: "🎴 10",
      rule: "Catégories : Choisis un thème, chacun doit dire un mot qui correspond. Le premier qui ne trouve pas boit 3 gorgées."
    },
    {
      card: "🎴 Valet",
      rule: "Question : Lance une chaîne de questions. Le premier qui répond ou hésite boit 2 gorgées."
    },
    {
      card: "🎴 Dame",
      rule: "Règle : Invente une nouvelle règle qui s'appliquera jusqu'à la fin du jeu."
    },
    {
      card: "🎴 Roi",
      rule: "Verre du Roi : Verse un peu de ta boisson dans le verre central. Le dernier Roi boit tout !"
    }
  ]),

  // ✨ Règles Spéciales
  ...createQuestions(categories.SPECIAL, [
    {
      card: "🃏 Joker Noir",
      rule: "Shot Time : Tout le monde prend un shot !"
    },
    {
      card: "🃏 Joker Rouge",
      rule: "Immunité : Tu es immunisé contre la prochaine règle qui t'affecte."
    },
    {
      card: "🎴 As de Cœur",
      rule: "Love Shot : Choisis quelqu'un pour prendre un shot avec toi."
    },
    {
      card: "🎴 As de Pique",
      rule: "Dark Shot : Prends un shot les yeux bandés."
    },
    {
      card: "🎴 Roi de Cœur",
      rule: "Roi de la Fête : Tu décides qui boit jusqu'au prochain Roi."
    }
  ]),

  // 🎯 Défis
  ...createQuestions(categories.DEFIS, [
    {
      card: "🎯 Défi 1",
      rule: "Fais 10 pompes ou bois 5 gorgées."
    },
    {
      card: "🎯 Défi 2",
      rule: "Raconte une blague. Si personne ne rit, bois 3 gorgées."
    },
    {
      card: "🎯 Défi 3",
      rule: "Chante une chanson. Les autres votent : si c'est mauvais, tu bois 4 gorgées."
    },
    {
      card: "🎯 Défi 4",
      rule: "Fais un poirier contre le mur ou bois 6 gorgées."
    },
    {
      card: "🎯 Défi 5",
      rule: "Imite une célébrité. Le premier à deviner fait boire 3 gorgées à qui il veut."
    }
  ]),

  // 🎨 Thématiques
  ...createQuestions(categories.THEMES, [
    {
      card: "🎨 Thème 1",
      rule: "Films : Cite des films d'horreur. Le premier qui sèche boit 3 gorgées."
    },
    {
      card: "🎨 Thème 2",
      rule: "Musique : Chante des chansons d'amour. Le premier qui ne trouve pas boit 3 gorgées."
    },
    {
      card: "🎨 Thème 3",
      rule: "Sport : Nomme des sports olympiques. Le premier qui répète ou ne trouve pas boit 3 gorgées."
    },
    {
      card: "🎨 Thème 4",
      rule: "Pays : Cite des pays d'Europe. Le premier qui se trompe boit 3 gorgées."
    },
    {
      card: "🎨 Thème 5",
      rule: "Marques : Nomme des marques de voitures. Le premier qui sèche boit 3 gorgées."
    }
  ]),

  // 👥 Équipes
  ...createQuestions(categories.EQUIPE, [
    {
      card: "👥 Équipe 1",
      rule: "Divise le groupe en deux équipes. L'équipe qui perd au pierre-feuille-ciseaux boit 2 gorgées chacun."
    },
    {
      card: "👥 Équipe 2",
      rule: "Bras de fer : Choisis un adversaire. Le perdant boit 4 gorgées."
    },
    {
      card: "👥 Équipe 3",
      rule: "Bataille de pouces : Tout le monde joue. Les perdants boivent 2 gorgées."
    },
    {
      card: "👥 Équipe 4",
      rule: "Jeu du regard : Le premier qui cligne des yeux boit 3 gorgées."
    },
    {
      card: "👥 Équipe 5",
      rule: "Quiz en équipe : L'équipe qui perd boit 2 gorgées par personne."
    }
  ]),

  // 📖 Histoire Continue
  ...createQuestions(categories.HISTOIRE, [
    {
      card: "📖 Histoire 1",
      rule: "Commence une histoire avec un mot. Chacun ajoute un mot. Celui qui hésite ou répète boit 2 gorgées."
    },
    {
      card: "📖 Histoire 2",
      rule: "Raconte le début d'une blague. Le suivant continue. Celui qui casse le flow boit 3 gorgées."
    },
    {
      card: "📖 Histoire 3",
      rule: "Commence une chanson. Chacun chante une ligne. Le premier qui se trompe boit 3 gorgées."
    },
    {
      card: "📖 Histoire 4",
      rule: "Invente une règle qui s'enchaîne avec la précédente. Si impossible, bois 4 gorgées."
    },
    {
      card: "📖 Histoire 5",
      rule: "Crée un personnage. Chacun ajoute une caractéristique. Le premier qui répète boit 2 gorgées."
    }
  ])
];

export const drinkingCardsConfig = {
  categories: Object.values(categories),
  shuffleOnLoad: true,
  winningCount: 5
}; 