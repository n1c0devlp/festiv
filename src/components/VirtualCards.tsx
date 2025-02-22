import { useState, useEffect } from 'react';
import styles from '@/styles/VirtualCards.module.css';

interface Card {
  suit: '♠' | '♥' | '♦' | '♣' | '★';
  value: string;
  color: 'red' | 'black';
}

interface VirtualCardsProps {
  onClose: () => void;
}

export default function VirtualCards({ onClose }: VirtualCardsProps) {
  const [deck, setDeck] = useState<Card[]>([]);
  const [drawnCards, setDrawnCards] = useState<Card[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [playerCount, setPlayerCount] = useState(2);
  const [cardsPerPlayer, setCardsPerPlayer] = useState(5);

  // Initialisation du deck
  useEffect(() => {
    initializeDeck();
  }, []);

  const initializeDeck = () => {
    const suits: Card['suit'][] = ['♠', '♥', '♦', '♣'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck: Card[] = [];

    suits.forEach(suit => {
      values.forEach(value => {
        newDeck.push({
          suit,
          value,
          color: suit === '♥' || suit === '♦' ? 'red' : 'black'
        });
      });
    });

    // Ajout des jokers
    newDeck.push({ suit: '★', value: 'JOKER', color: 'red' });
    newDeck.push({ suit: '★', value: 'JOKER', color: 'black' });

    setDeck(newDeck);
  };

  const shuffleDeck = () => {
    setIsShuffling(true);
    const audio = new Audio('/sounds/shuffle.mp3');
    audio.play();

    setTimeout(() => {
      const newDeck = [...deck];
      for (let i = newDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
      }
      setDeck(newDeck);
      setIsShuffling(false);
    }, 1000);
  };

  const drawCard = () => {
    if (deck.length === 0) return;
    
    const newDeck = [...deck];
    const drawnCard = newDeck.pop()!;
    setDeck(newDeck);
    setDrawnCards(prev => [...prev, drawnCard]);
  };

  const dealCards = () => {
    if (deck.length < playerCount * cardsPerPlayer) {
      alert('Pas assez de cartes dans le deck !');
      return;
    }

    const newDeck = [...deck];
    const dealtCards: Card[][] = Array(playerCount).fill([]).map(() => []);

    for (let i = 0; i < cardsPerPlayer; i++) {
      for (let j = 0; j < playerCount; j++) {
        const card = newDeck.pop()!;
        dealtCards[j] = [...dealtCards[j], card];
      }
    }

    setDeck(newDeck);
    // Afficher les cartes distribuées dans l'interface
    setDrawnCards(dealtCards.flat());
  };

  const resetDeck = () => {
    initializeDeck();
    setDrawnCards([]);
  };

  return (
    <div className={styles.container}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Fermer">
        ×
      </button>

      <div className={styles.controls}>
        <div className={styles.deckInfo}>
          Cartes restantes : {deck.length}
        </div>

        <div className={styles.dealControls}>
          <label>
            Nombre de joueurs :
            <input
              type="number"
              min="1"
              max="8"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
            />
          </label>
          <label>
            Cartes par joueur :
            <input
              type="number"
              min="1"
              max="10"
              value={cardsPerPlayer}
              onChange={(e) => setCardsPerPlayer(Number(e.target.value))}
            />
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.actionButton}
            onClick={shuffleDeck}
            disabled={isShuffling}
          >
            {isShuffling ? 'Mélange...' : 'Mélanger'}
          </button>
          <button
            className={styles.actionButton}
            onClick={drawCard}
            disabled={deck.length === 0}
          >
            Tirer une carte
          </button>
          <button
            className={styles.actionButton}
            onClick={dealCards}
            disabled={deck.length < playerCount * cardsPerPlayer}
          >
            Distribuer
          </button>
          <button
            className={styles.actionButton}
            onClick={resetDeck}
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className={styles.playArea}>
        <div className={styles.deck} onClick={drawCard}>
          {deck.length > 0 && (
            <div className={`${styles.card} ${styles.cardBack} ${isShuffling ? styles.shuffling : ''}`} />
          )}
        </div>

        <div className={styles.drawnCards}>
          {drawnCards.map((card, index) => (
            <div
              key={index}
              className={`${styles.card} ${styles.cardFront}`}
              style={{ color: card.color }}
            >
              <div className={styles.cardCorner}>
                <div>{card.value}</div>
                <div>{card.suit}</div>
              </div>
              <div className={styles.cardCenter}>{card.suit}</div>
              <div className={`${styles.cardCorner} ${styles.bottomRight}`}>
                <div>{card.value}</div>
                <div>{card.suit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 