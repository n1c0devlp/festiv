import { useState, useEffect } from 'react';
import styles from '@/styles/VirtualDice.module.css';

interface DiceProps {
  onClose: () => void;
}

export default function VirtualDice({ onClose }: DiceProps) {
  const [diceCount, setDiceCount] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [history, setHistory] = useState<number[][]>([]);

  const rollDice = () => {
    setIsRolling(true);
    const audio = new Audio('/sounds/dice-roll.mp3');
    audio.play();

    // Animation de roulement
    const rolls = 10;
    let currentRoll = 0;
    
    const rollInterval = setInterval(() => {
      const newResults = Array(diceCount).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
      setResults(newResults);
      
      currentRoll++;
      if (currentRoll >= rolls) {
        clearInterval(rollInterval);
        setIsRolling(false);
        setHistory(prev => [...prev, newResults]);
      }
    }, 100);
  };

  const clearHistory = () => {
    setHistory([]);
    setResults([]);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
        ×
      </button>

      <div className={styles.controls}>
        <label className={styles.diceCountLabel}>
          Nombre de dés :
          <input
            type="range"
            min="1"
            max="6"
            value={diceCount}
            onChange={(e) => setDiceCount(Number(e.target.value))}
            className={styles.diceCountSlider}
          />
          <span>{diceCount}</span>
        </label>

        <button
          className={styles.rollButton}
          onClick={rollDice}
          disabled={isRolling}
        >
          {isRolling ? 'Lancer en cours...' : 'Lancer les dés !'}
        </button>
      </div>

      <div className={styles.diceContainer}>
        {results.map((result, index) => (
          <div
            key={index}
            className={`${styles.dice} ${isRolling ? styles.rolling : ''}`}
            data-value={result}
          >
            {Array(result).fill(0).map((_, i) => (
              <div key={i} className={styles.dot} />
            ))}
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className={styles.total}>
          Total : {results.reduce((a, b) => a + b, 0)}
        </div>
      )}

      {history.length > 0 && (
        <div className={styles.history}>
          <h3>Historique</h3>
          <button className={styles.clearButton} onClick={clearHistory}>
            Effacer
          </button>
          <div className={styles.historyList}>
            {history.map((roll, index) => (
              <div key={index} className={styles.historyItem}>
                Lancer {index + 1}: {roll.join(', ')} = {roll.reduce((a, b) => a + b, 0)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 