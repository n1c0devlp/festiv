import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css';
import { games } from '@/config/games';

export default function Home() {
  const router = useRouter();

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Festiv'
      </h1>
      <div className={styles.grid}>
        {games.map((game) => (
          <button
            key={game.id}
            className={styles.card}
            onClick={() => router.push(`/games/${game.id}`)}
          >
            <div className={styles.cardIcon}>{game.icon}</div>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
          </button>
        ))}
      </div>
    </main>
  );
} 