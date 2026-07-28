import { getHighResImage } from '../utils/imageHelpers';
import styles from './DealCard.module.css';

function DealCard({ deal, stores }) {
  const store = stores.find(s => s.storeID === deal.storeID);
  const storeName = store ? store.storeName : 'Tienda Desconocida';
  const discount = Math.round(100 - (deal.salePrice / deal.normalPrice) * 100);

  // Función para determinar el color del badge de Metacritic
  const getMetacriticClass = (score) => {
    const num = Number(score);
    if (num >= 75) return styles.metacriticHigh;
    if (num >= 50) return styles.metacriticMedium;
    return styles.metacriticLow;
  };

  return (
    <div className={styles.card}>
      <img 
        src={getHighResImage(deal)} 
        alt={deal.title} 
        className={styles.image}
        onError={(e) => { e.target.src = deal.thumb; }} 
      />
      <div className={styles.info}>
        <div>
          <span className={styles.storeBadge}>{storeName}</span>
          <h2 className={styles.title} title={deal.title}>
            {deal.title}
          </h2>

          {/* BADGES DE PUNTUACIÓN */}
          <div className={styles.ratingsRow}>
            {Number(deal.metacriticScore) > 0 && (
              <span 
                className={`${styles.metacriticBadge} ${getMetacriticClass(deal.metacriticScore)}`}
                title="Puntuación en Metacritic"
              >
                MC: {deal.metacriticScore}
              </span>
            )}
            {Number(deal.steamRatingPercent) > 0 && (
              <span className={styles.steamRatingBadge} title="Valoraciones positivas en Steam">
                👍 {deal.steamRatingPercent}%
              </span>
            )}
          </div>
        </div>
        
        <div className={styles.bottom}>
          <div className={styles.priceRow}>
            <div>
              <p className={styles.normalPrice}>${deal.normalPrice}</p>
              <p className={styles.salePrice}>${deal.salePrice}</p>
            </div>
            <div className={styles.discount}>-{discount}%</div>
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