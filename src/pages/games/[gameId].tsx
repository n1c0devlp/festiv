import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GameQuestion } from '@/types/types';
import styles from '@/styles/Game.module.css';
import { games } from '@/config/games';

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;
  const game = games.find(g => g.id === gameId);

  const shuffleArray = (array: GameQuestion[]): GameQuestion[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [cells, setCells] = useState<GameQuestion[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (game) {
      setIsClient(true);
      if (game.config.shuffleOnLoad) {
        const questions = selectedCategory
          ? game.questions.filter(q => q.category === selectedCategory)
          : game.questions;
        setCells(shuffleArray([...questions]));
      } else {
        setCells([...game.questions]);
      }
      setCurrentIndex(0);
      setScore(0);
    }
  }, [game, selectedCategory]);

  const resetGame = () => {
    if (game) {
      const questions = selectedCategory
        ? game.questions.filter(q => q.category === selectedCategory)
        : game.questions;
      const newCells = questions.map(cell => ({ ...cell, isChecked: false }));
      setCells(game.config.shuffleOnLoad ? shuffleArray(newCells) : newCells);
      setScore(0);
      setCurrentIndex(0);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < cells.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const toggleCell = (index: number) => {
    const newCells = [...cells];
    const newChecked = !newCells[index].isChecked;
    newCells[index] = {
      ...newCells[index],
      isChecked: newChecked
    };
    setCells(newCells);
    setScore(newCells.filter(cell => cell.isChecked).length);
  };

  if (!game) {
    return (
      <main className={styles.container}>
        <h1>Jeu non trouvé</h1>
        <Link href="/" className={styles.backButton}>
          Retour à l'accueil
        </Link>
      </main>
    );
  }

  const renderCategories = () => (
    <div className={styles.categories}>
      <button
        className={`${styles.categoryButton} ${!selectedCategory ? styles.selected : ''}`}
        onClick={() => setSelectedCategory(null)}
      >
        Toutes les catégories
      </button>
      {game.config.categories?.map((category) => (
        <button
          key={category}
          className={`${styles.categoryButton} ${selectedCategory === category ? styles.selected : ''}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );

  const renderSingleQuestion = () => {
    if (cells.length === 0) return null;
    const currentQuestion = cells[currentIndex];
    
    return (
      <div className={styles.singleQuestionContainer}>
        <div className={styles.questionProgress}>
          Question {currentIndex + 1} / {cells.length}
          {currentQuestion.category && (
            <span className={styles.questionCategory}>
              {currentQuestion.category}
            </span>
          )}
        </div>
        <button
          className={`${styles.questionCard} ${currentQuestion.isChecked ? styles.checked : ''}`}
          onClick={() => toggleCell(currentIndex)}
        >
          {currentQuestion.text}
        </button>
        <div className={styles.navigationButtons}>
          <button
            className={styles.navButton}
            onClick={previousQuestion}
            disabled={currentIndex === 0}
          >
            ← Précédente
          </button>
          <button
            className={styles.navButton}
            onClick={nextQuestion}
            disabled={currentIndex === cells.length - 1}
          >
            Suivante →
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          ← Retour
        </Link>
        <h1 className={styles.title}>
          <span>{game.icon}</span>
          <br />
          {game.title}
        </h1>
        <div className={styles.scoreContainer}>
          <div className={styles.score}>
            Score: {score} / {cells.length}
          </div>
          {score >= game.config.winningCount && (
            <div className={styles.winMessage}>Gagné !</div>
          )}
        </div>
      </header>

      {game.config.categories && renderCategories()}

      {game.config.displayMode === 'single' 
        ? renderSingleQuestion()
        : (
          <div className={styles.grid}>
            {cells.map((cell, index) => (
              <button
                key={index}
                className={`${styles.cell} ${cell.isChecked ? styles.checked : ''}`}
                onClick={() => toggleCell(index)}
              >
                {cell.text}
              </button>
            ))}
          </div>
        )
      }

      <button 
        className={styles.resetButton}
        onClick={resetGame}
      >
        Réinitialiser
      </button>
    </>
  );

  if (!isClient && game.config.shuffleOnLoad) {
    return (
      <main className={styles.container}>
        {renderContent()}
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {renderContent()}
    </main>
  );
} 