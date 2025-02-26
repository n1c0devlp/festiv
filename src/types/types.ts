export interface GameQuestion {
  text: string;
  isChecked: boolean;
  category?: string;
  metadata?: {
    points?: number;
    timer?: number;
    requiredPlayers?: number;
    questions?: GameQuestion[];
    config?: GameConfig;
  };
}

export interface GameConfig {
  winningCount: number;
  gridSize?: {
    rows: number;
    columns: number;
  };
  shuffleOnLoad: boolean;
  displayMode?: 'grid' | 'single';
  categories?: string[];
  title?: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: GameQuestion[];
  config: GameConfig;
}

// Pour la rétrocompatibilité
export type BingoCell = GameQuestion;
export type BingoBoard = {
  cells: GameQuestion[];
}; 