// src/components/DealCardSkeleton.jsx
import styles from './DealCardSkeleton.module.css';

function DealCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonInfo}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonTitle} />
        
        <div className={styles.skeletonPriceRow}>
          <div className={styles.skeletonPrice} />
          <div className={styles.skeletonDiscount} />
        </div>
        
        <div className={styles.skeletonBtn} />
      </div>
    </div>
  );
}

export default DealCardSkeleton;