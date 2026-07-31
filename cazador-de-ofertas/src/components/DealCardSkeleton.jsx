import styles from './DealCardSkeleton.module.css';

function DealCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonBadges} />
        
        <div className={styles.skeletonBottomRow}>
          <div className={styles.skeletonPrice} />
          <div className={styles.skeletonBtn} />
        </div>
      </div>
    </div>
  );
}

export default DealCardSkeleton;