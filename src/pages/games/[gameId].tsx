import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { GameQuestion } from '@/types/types';
import styles from '@/styles/Game.module.css';
import { games } from '@/config/games';
import VirtualDice from '@/components/VirtualDice';
import VirtualCards from '@/components/VirtualCards';
import Picolo from '@/components/Picolo';
import Link from 'next/link';

interface GameRulesProps {
  game: {
    id: string;
    title: string;
    icon: string;
    questions: GameQuestion[];
  };
  onClose: () => void;
}

const GameRules = ({ game, onClose }: GameRulesProps) => {
  const rules = game.questions[0].text;
  const sections = rules.split('\n\n').filter(section => section.trim());

  return (
    <div className={styles.rulesContainer}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
        ×
      </button>
      <div className={styles.rulesHeader}>
        <h2 className={styles.rulesTitle}>
          <span className={styles.rulesIcon}>{game.icon}</span>
          {game.title}
        </h2>
      </div>
      <div className={styles.rulesContent}>
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n');
          return (
            <div key={index} className={styles.rulesSection}>
              {title.includes('━━━') ? (
                <h3 className={styles.rulesMainTitle}>
                  {title.replace(/━/g, '').trim()}
                </h3>
              ) : (
                <>
                  <h4 className={styles.rulesSectionTitle}>{title}</h4>
                  <div className={styles.rulesSectionContent}>
                    {content.join('\n')}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface NeverHaveIEverProps {
  questions: GameQuestion[];
  categories: Record<string, string>;
}

const CategoryBasedGame = ({ questions, categories }: NeverHaveIEverProps) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const router = useRouter();
  const { gameId } = router.query;
  const game = games.find(g => g.id === gameId);

  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, GameQuestion[]>);

  const currentQuestions = currentCategory ? questionsByCategory[currentCategory] : [];

  const handleCategorySelect = (category: string) => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(0);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const resetCategory = () => {
    setCurrentCategory(null);
    setCurrentQuestionIndex(0);
  };

  if (!currentCategory) {
    return (
      <div className={styles.categoriesList}>
        {Object.entries(categories).map(([key, category], index) => (
          <button
            key={key}
            className={styles.categoryButton}
            onClick={() => handleCategorySelect(key)}
            style={{ '--index': index } as any}
          >
            <div className={styles.categoryIcon}>
              {key.split(' ')[0]}
            </div>
            <div className={styles.categoryInfo}>
              <h2 className={styles.categoryTitle}>{category}</h2>
              <p className={styles.categoryDescription}>
                {questionsByCategory[key]?.length || 0} questions
              </p>
            </div>
            <span className={styles.categoryArrow}>→</span>
          </button>
        ))}
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentQuestionIndex];

  return (
    <>
      <div className={styles.questionCategory}>
        {currentCategory.split(' ')[0]} {categories[currentCategory]}
      </div>
      <div className={styles.questionCard}>
        {currentQuestion.text}
      </div>
      <div className={styles.navigationButtons}>
        <button
          className={styles.navButton}
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          ← Précédent
        </button>
        <button
          className={styles.navButton}
          onClick={nextQuestion}
          disabled={currentQuestionIndex === currentQuestions.length - 1}
        >
          Suivant →
        </button>
      </div>
    </>
  );
};

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;
  const game = games.find(g => g.id === gameId);
  const [selectedGame, setSelectedGame] = useState<GameQuestion | null>(null);
  const [checkedCells, setCheckedCells] = useState<boolean[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  useEffect(() => {
    if (selectedGame?.metadata?.questions) {
      setCheckedCells(new Array(selectedGame.metadata.questions.length).fill(false));
      
      // Mélanger les questions si shuffleOnLoad est activé
      if (selectedGame.metadata.config?.shuffleOnLoad) {
        selectedGame.metadata.questions = [...selectedGame.metadata.questions].sort(() => Math.random() - 0.5);
      }
    }
  }, [selectedGame]);

  if (!game) {
    return (
      <main className={styles.container}>
        <header className={styles.header}>
          <button onClick={() => window.history.back()} className={styles.backButton}>
            <span>←</span>
            <span>Retour</span>
          </button>
          <h1 className={styles.title}>Jeu non trouvé</h1>
        </header>
      </main>
    );
  }

  const handleCellClick = (index: number) => {
    if (selectedGame?.metadata?.questions) {
      const newCheckedCells = [...checkedCells];
      newCheckedCells[index] = !newCheckedCells[index];
      setCheckedCells(newCheckedCells);
    }
  };

  const checkedCount = checkedCells.filter(Boolean).length;
  const hasWon = checkedCount >= (selectedGame?.metadata?.config?.winningCount || 5);

  const getBackButtonText = () => {
    if (selectedGame) return "Retour aux bingos";
    if (currentCategory) return "Retour aux catégories";
    return "Retour";
  };

  const handleBackClick = () => {
    if (selectedGame) {
      setSelectedGame(null);
      return;
    }
    if (currentCategory) {
      setCurrentCategory(null);
      return;
    }
    window.history.back();
  };

  const renderGameContent = () => {
    if (!game) {
      return (
        <div>
          <p>Jeu non trouvé</p>
          <Link href="/">Retour</Link>
        </div>
      );
    }

    const categoriesToObject = (categories: string[]) => {
      return categories.reduce((acc, cat) => ({
        ...acc,
        [cat]: cat
      }), {} as Record<string, string>);
    };

    const isBingoGame = game.id === 'bingo';
    const isCardGame = game.id === 'card-games';
    const isPicoloGame = game.id === 'picolo';
    const isCategoryBasedGame = ['never-have-i-ever', 'quiz', 'truth-or-dare', 'drinking-cards'].includes(game.id);

    if (isBingoGame) {
      if (!selectedGame) {
        return (
          <div className={styles.categoriesList}>
            {game.questions.map((bingoGame, index) => (
              <button
                key={index}
                className={styles.categoryButton}
                onClick={() => setSelectedGame(bingoGame)}
                style={{ '--index': index } as any}
              >
                <div className={styles.categoryIcon}>
                  {bingoGame.category?.split(' ')[0]}
                </div>
                <div className={styles.categoryInfo}>
                  <h2 className={styles.categoryTitle}>
                    {bingoGame.category?.split(' ').slice(1).join(' ')}
                  </h2>
                  <p className={styles.categoryDescription}>
                    {bingoGame.text}
                  </p>
                </div>
                <span className={styles.categoryArrow}>→</span>
              </button>
            ))}
          </div>
        );
      }

      return (
        <>
          <div className={styles.scoreContainer}>
            <div className={styles.score}>
              Cases cochées : {checkedCount} / {selectedGame.metadata?.config?.winningCount || 5}
            </div>
            {hasWon && (
              <div className={styles.winMessage}>
                🎉 Félicitations ! Vous avez gagné ! 🎉
              </div>
            )}
          </div>
          <div className={styles.grid}>
            {selectedGame.metadata?.questions?.map((question, index) => (
              <button
                key={index}
                className={`${styles.cell} ${checkedCells[index] ? styles.checked : ''}`}
                onClick={() => handleCellClick(index)}
              >
                {question.text}
              </button>
            ))}
          </div>
          <button
            className={styles.resetButton}
            onClick={() => {
              if (selectedGame.metadata?.questions) {
                setCheckedCells(new Array(selectedGame.metadata.questions.length).fill(false));
                if (selectedGame.metadata.config?.shuffleOnLoad) {
                  selectedGame.metadata.questions = [...selectedGame.metadata.questions].sort(() => Math.random() - 0.5);
                }
              }
            }}
          >
            Réinitialiser
          </button>
        </>
      );
    }

    if (isCategoryBasedGame) {
      return <CategoryBasedGame questions={game.questions} categories={categoriesToObject(game.config.categories)} />;
    }

    if (isCardGame) {
      if (!selectedGame) {
        return (
          <div className={styles.categoriesList}>
            {game.questions.map((gameCategory, index) => (
              <button
                key={index}
                className={styles.categoryButton}
                onClick={() => setSelectedGame(gameCategory)}
                style={{ '--index': index } as any}
              >
                <div className={styles.categoryIcon}>
                  {gameCategory.category?.split(' ')[0] || game.icon}
                </div>
                <div className={styles.categoryInfo}>
                  <h2 className={styles.categoryTitle}>
                    {gameCategory.category?.split(' ').slice(1).join(' ') || 'Question ' + (index + 1)}
                  </h2>
                  <p className={styles.categoryDescription}>
                    {gameCategory.category?.includes('Virtuel') 
                      ? 'Cliquez pour jouer'
                      : 'Cliquez pour voir les règles'}
                  </p>
                </div>
                <span className={styles.categoryArrow}>→</span>
              </button>
            ))}
          </div>
        );
      }

      switch (selectedGame.category) {
        case "🎲 Dés Virtuels":
          return <VirtualDice onClose={() => setSelectedGame(null)} />;
        case "🎴 Cartes Virtuelles":
          return <VirtualCards onClose={() => setSelectedGame(null)} />;
        default:
          return (
            <GameRules 
              game={{
                id: game.id,
                title: selectedGame.category,
                icon: selectedGame.category.split(' ')[0],
                questions: [selectedGame]
              }}
              onClose={() => setSelectedGame(null)}
            />
          );
      }
    }

    if (isPicoloGame) {
      return <Picolo questions={game.questions} categories={categoriesToObject(game.config.categories)} />;
    }

    return (
      <div>
        <p>Type de jeu non reconnu</p>
        <Link href="/">Retour</Link>
      </div>
    );
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleBackClick} className={styles.backButton}>
          <span>←</span>
          <span>{getBackButtonText()}</span>
        </button>
        <h1 className={styles.title}>
          {game.title}
        </h1>
      </header>

      {renderGameContent()}
    </main>
  );
} 