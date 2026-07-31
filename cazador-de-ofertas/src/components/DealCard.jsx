import styles from './DealCard.module.css';

function DealCard({ deal, stores }) {
  const store = stores.find(s => s.storeID === deal.storeID);
  const storeName = store ? store.storeName : 'Desconocida';
  const discount = Math.round(100 - (deal.salePrice / deal.normalPrice) * 100);

  const getMetacriticClass = (score) => {
    const num = Number(score);
    if (num >= 75) return styles.metacriticHigh;
    if (num >= 50) return styles.metacriticMedium;
    return styles.metacriticLow;
  };

  return (
    <div className={styles.card}>
      {/* Contenedor adaptado a la miniatura de 120x45 */}
      <div className={styles.thumbContainer}>
        <img 
          src={deal.thumb} 
          alt={deal.title} 
          className={styles.thumbImage}
          onError={(e) => { 
            e.target.src = 'https://placehold.co/120x45/18181b/a1a1aa?text=No+Img';
          }} 
        />
      </div>

      <div className={styles.info}>
        <div className={styles.headerRow}>
          <h2 className={styles.title} title={deal.title}>{deal.title}</h2>
          <span className={styles.storeBadge}>{storeName}</span>
        </div>

        <div className={styles.ratingsRow}>
          {Number(deal.metacriticScore) > 0 && (
            <span className={`${styles.badge} ${getMetacriticClass(deal.metacriticScore)}`}>
              MC: {deal.metacriticScore}
            </span>
          )}
          {Number(deal.steamRatingPercent) > 0 && (
            <span className={`${styles.badge} ${styles.steamBadge}`}>
              Steam: {deal.steamRatingPercent}%
            </span>
          )}
        </div>
        
        <div className={styles.bottomRow}>
          <div className={styles.priceSection}>
            <div className={styles.discountBadge}>-{discount}%</div>
            <div className={styles.priceColumn}>
              <span className={styles.normalPrice}>${deal.normalPrice}</span>
              <span className={styles.salePrice}>${deal.salePrice}</span>
            </div>
          </div>
          <a 
            href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} 
            target="_blank" 
            rel="noreferrer"
            className={styles.btn}
          >
            Ver Oferta
          </a>
        </div>
      </div>
    </div>
  );
}

export default DealCard;