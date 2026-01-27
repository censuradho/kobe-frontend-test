import styles from './styles.module.css'

export function TypingIndicator () {
  return (
    <span
      aria-label="O agente está digitando"
      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-surface-contrast"
    >
      <span className={styles.dot}>•</span>
      <span className={`${styles.dot} ${styles.dot2}`}>•</span>
      <span className={`${styles.dot} ${styles.dot3}`}>•</span>
    </span>
  );
}