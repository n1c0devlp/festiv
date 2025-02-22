import { GameQuestion } from '@/types/types';

export const categories = {
  HISTOIRE: "📚 Histoire",
  GEOGRAPHIE: "🌍 Géographie",
  CULTURE: "🎭 Culture & Arts",
  SCIENCES: "🔬 Sciences",
  SPORT: "⚽ Sport",
  DIVERTISSEMENT: "🎬 Divertissement"
} as const;

const createQuestions = (category: string, questions: { question: string, answer: string }[]): GameQuestion[] => {
  return questions.map(({ question, answer }) => ({
    text: `Q: ${question}\nR: ${answer}`,
    category,
    isChecked: false
  }));
};

export const quizQuestions: GameQuestion[] = [
  // 📚 Histoire
  ...createQuestions(categories.HISTOIRE, [
    {
      question: "En quelle année a eu lieu la Révolution française ?",
      answer: "1789"
    },
    {
      question: "Qui était le premier empereur romain ?",
      answer: "Auguste"
    },
    {
      question: "Quel roi de France était surnommé le Roi-Soleil ?",
      answer: "Louis XIV"
    },
    {
      question: "En quelle année la Première Guerre mondiale a-t-elle commencé ?",
      answer: "1914"
    },
    {
      question: "Qui a découvert l'Amérique en 1492 ?",
      answer: "Christophe Colomb"
    }
  ]),

  // 🌍 Géographie
  ...createQuestions(categories.GEOGRAPHIE, [
    {
      question: "Quelle est la capitale de l'Australie ?",
      answer: "Canberra"
    },
    {
      question: "Quel est le plus long fleuve du monde ?",
      answer: "Le Nil"
    },
    {
      question: "Dans quel pays se trouve le Machu Picchu ?",
      answer: "Le Pérou"
    },
    {
      question: "Quelle est la plus haute montagne du monde ?",
      answer: "L'Everest"
    },
    {
      question: "Quel est le plus grand océan du monde ?",
      answer: "L'océan Pacifique"
    }
  ]),

  // 🎭 Culture & Arts
  ...createQuestions(categories.CULTURE, [
    {
      question: "Qui a peint La Joconde ?",
      answer: "Léonard de Vinci"
    },
    {
      question: "Quel artiste a peint Les Tournesols ?",
      answer: "Vincent van Gogh"
    },
    {
      question: "Qui a écrit Les Misérables ?",
      answer: "Victor Hugo"
    },
    {
      question: "Quel est l'auteur de Don Quichotte ?",
      answer: "Miguel de Cervantes"
    },
    {
      question: "Qui a composé La Flûte enchantée ?",
      answer: "Wolfgang Amadeus Mozart"
    }
  ]),

  // 🔬 Sciences
  ...createQuestions(categories.SCIENCES, [
    {
      question: "Quelle est la formule chimique de l'eau ?",
      answer: "H2O"
    },
    {
      question: "Qui a formulé la théorie de la relativité ?",
      answer: "Albert Einstein"
    },
    {
      question: "Quel est l'élément chimique le plus abondant dans l'univers ?",
      answer: "L'hydrogène"
    },
    {
      question: "Combien de planètes compte notre système solaire ?",
      answer: "8"
    },
    {
      question: "Quelle est la vitesse de la lumière en km/s ?",
      answer: "299 792"
    }
  ]),

  // ⚽ Sport
  ...createQuestions(categories.SPORT, [
    {
      question: "Qui détient le record du 100m masculin ?",
      answer: "Usain Bolt"
    },
    {
      question: "En quelle année la France a-t-elle gagné sa première Coupe du monde de football ?",
      answer: "1998"
    },
    {
      question: "Combien de joueurs compose une équipe de rugby sur le terrain ?",
      answer: "15"
    },
    {
      question: "Dans quel sport utilise-t-on un volant ?",
      answer: "Le badminton"
    },
    {
      question: "Quelle ville a accueilli les premiers Jeux Olympiques modernes ?",
      answer: "Athènes"
    }
  ]),

  // 🎬 Divertissement
  ...createQuestions(categories.DIVERTISSEMENT, [
    {
      question: "Quel acteur joue Iron Man dans l'univers Marvel ?",
      answer: "Robert Downey Jr."
    },
    {
      question: "Quelle série détient le record d'Emmy Awards ?",
      answer: "Game of Thrones"
    },
    {
      question: "Qui a réalisé Titanic ?",
      answer: "James Cameron"
    },
    {
      question: "Quel est le film le plus rentable de tous les temps ?",
      answer: "Avatar"
    },
    {
      question: "Quelle est la première console de jeux Nintendo ?",
      answer: "La NES"
    }
  ])
];

export const quizConfig = {
  categories: Object.values(categories),
  winningCount: 3,
  shuffleOnLoad: true
}; 