import { useState, useEffect } from 'react';
import styles from '@/styles/Picolo.module.css';
import { GameQuestion } from '@/types/types';

interface PicoloProps {
  questions: GameQuestion[];
  categories: Record<string, string>;
  onClose?: () => void;
}

export default function Picolo({ questions, categories, onClose }: PicoloProps) {
  const [players, setPlayers] = useState<string[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [timer, setTimer] = useState<number | null>(null);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<GameQuestion[]>([]);

  const questionsByCategory = questions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, GameQuestion[]>);

  const addPlayer = () => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      setPlayers([...players, playerName.trim()]);
      setScores(prev => ({ ...prev, [playerName.trim()]: 0 }));
      setPlayerName('');
    }
  };

  const removePlayer = (player: string) => {
    setPlayers(players.filter(p => p !== player));
    const newScores = { ...scores };
    delete newScores[player];
    setScores(newScores);
  };

  const startGame = () => {
    if (players.length >= 2) {
      setGameStarted(true);
      const allQuestions = questions.filter(q => q.category !== categories.ALEATOIRE);
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      setRandomQuestions(shuffled);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (category === 'ALEATOIRE') {
      setIsRandomMode(true);
      setCurrentQuestionIndex(0);
    } else {
      setIsRandomMode(false);
      setCurrentCategory(category);
      setCurrentQuestionIndex(0);
    }
  };

  const nextQuestion = () => {
    if (isRandomMode) {
      if (currentQuestionIndex < randomQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setTimer(null);
      }
    } else if (currentCategory && currentQuestionIndex < questionsByCategory[currentCategory].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(null);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setTimer(null);
    }
  };

  const resetCategory = () => {
    setCurrentCategory(null);
    setCurrentQuestionIndex(0);
    setTimer(null);
    setIsRandomMode(false);
  };

  const updateScore = (player: string, points: number) => {
    setScores(prev => ({
      ...prev,
      [player]: (prev[player] || 0) + points
    }));
  };

  const formatQuestion = (text: string): string => {
    let formattedText = text;
    if (text.includes('[Joueur]')) {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      formattedText = text.replace('[Joueur]', randomPlayer);
    }
    if (text.includes('[Joueur1]') && text.includes('[Joueur2]')) {
      const [player1, player2] = getRandomPlayers(2);
      formattedText = text.replace('[Joueur1]', player1).replace('[Joueur2]', player2);
    }
    return formattedText;
  };

  const getRandomPlayers = (count: number): string[] => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (timer !== null) {
      const interval = setInterval(() => {
        setTimer(prev => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  if (!gameStarted) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Ajouter des joueurs</h2>
        <div className={styles.playerInput}>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Nom du joueur"
            onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
          />
          <button onClick={addPlayer}>Ajouter</button>
        </div>
        <div className={styles.playerList}>
          {players.map(player => (
            <div key={player} className={styles.playerItem}>
              <span>{player}</span>
              <button onClick={() => removePlayer(player)}>×</button>
            </div>
          ))}
        </div>
        {players.length < 2 && (
          <p className={styles.warning}>Ajoutez au moins 2 joueurs pour commencer</p>
        )}
        <button
          className={styles.startButton}
          onClick={startGame}
          disabled={players.length < 2}
        >
          Commencer le jeu !
        </button>
      </div>
    );
  }

  if (!currentCategory && !isRandomMode) {
    return (
      <div className={styles.container}>
        <div className={styles.scoreBoard}>
          {Object.entries(scores).map(([player, score]) => (
            <div key={player} className={styles.scoreItem}>
              <span>{player}</span>
              <span>{score} points</span>
            </div>
          ))}
        </div>
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
                  {key === 'ALEATOIRE' 
                    ? 'Toutes les questions mélangées !'
                    : `${questionsByCategory[key]?.length || 0} défis`}
                </p>
              </div>
              <span className={styles.categoryArrow}>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = isRandomMode 
    ? randomQuestions[currentQuestionIndex]
    : questionsByCategory[currentCategory][currentQuestionIndex];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={resetCategory}>
        ← Retour aux catégories
      </button>
      <div className={styles.questionCategory}>
        {isRandomMode 
          ? '🎲 Mode Aléatoire'
          : categories[currentCategory]}
      </div>
      <div className={styles.questionCard}>
        <div className={styles.questionText}>
          {formatQuestion(currentQuestion.text)}
        </div>
        {timer !== null && (
          <div className={styles.timer}>
            Temps restant : {timer}s
          </div>
        )}
        <div className={styles.points}>
          Points : {currentQuestion.metadata?.points || 0}
        </div>
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
          disabled={isRandomMode 
            ? currentQuestionIndex === randomQuestions.length - 1
            : currentQuestionIndex === questionsByCategory[currentCategory].length - 1}
        >
          Suivant →
        </button>
      </div>
      <div className={styles.progressInfo}>
        Question {currentQuestionIndex + 1} / {isRandomMode ? randomQuestions.length : questionsByCategory[currentCategory].length}
      </div>
    </div>
  );
} 