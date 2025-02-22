import { useState } from 'react';
import { useRouter } from 'next/router';
import { GameQuestion } from '@/types/types';
import styles from '@/styles/Game.module.css';
import { games } from '@/config/games';
import VirtualDice from '@/components/VirtualDice';
import VirtualCards from '@/components/VirtualCards';

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

export default function GamePage() {
  const router = useRouter();
  const { gameId } = router.query;
  const game = games.find(g => g.id === gameId);
  const [selectedGame, setSelectedGame] = useState<GameQuestion | null>(null);

  if (!game) {
    return (
      <main className={styles.container}>
        <h1>Jeu non trouvé</h1>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Retour
        </button>
      </main>
    );
  }

  const handleGameClick = (gameCategory: GameQuestion) => {
    setSelectedGame(gameCategory);
  };

  const renderGameContent = () => {
    if (!selectedGame) return null;

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
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          <span>←</span>
          <span>Retour</span>
        </button>
        <h1 className={styles.title}>
          {game.title}
        </h1>
      </header>

      {selectedGame ? (
        renderGameContent()
      ) : (
        <div className={styles.gamesGrid}>
          {game.questions.map((gameCategory, index) => (
            <button
              key={index}
              className={styles.gameCard}
              onClick={() => handleGameClick(gameCategory)}
              style={{ '--index': index } as any}
            >
              <div className={styles.gameIcon}>
                {gameCategory.category.split(' ')[0]}
              </div>
              <h2 className={styles.gameTitle}>
                {gameCategory.category.split(' ').slice(1).join(' ')}
              </h2>
              <p className={styles.gameDescription}>
                {gameCategory.category.includes('Virtuel') 
                  ? 'Cliquez pour jouer'
                  : 'Cliquez pour voir les règles'}
              </p>
            </button>
          ))}
        </div>
      )}
    </main>
  );
} 