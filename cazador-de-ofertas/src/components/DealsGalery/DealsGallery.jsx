import { useEffect, useState } from 'react';
import './DealsGallery.css';

function DealsGallery() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pedimos las ofertas de Steam de hasta $20
    const apiUrl = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=24';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setDeals(data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching deals:", error));
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Buscando en Steam...</div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div className="gallery-content">
        <h1 className="gallery-title">
          🎮 Ofertas de Steam
        </h1>
        <p className="gallery-subtitle">
          Los mejores chollos por menos de $20
        </p>
        
        <div className="gallery-grid">
          {deals.map(deal => (
            <div key={deal.dealID} className="deal-card">
              <img 
                src={deal.thumb} 
                alt={deal.title} 
                className="deal-image"
              />
              <div className="deal-info">
                <div>
                  <h2 className="deal-title" title={deal.title}>
                    {deal.title}
                  </h2>
                </div>
                
                <div className="deal-bottom">
                  <div className="deal-price-row">
                    <div>
                      <p className="deal-normal-price">${deal.normalPrice}</p>
                      <p className="deal-sale-price">${deal.salePrice}</p>
                    </div>
                    <div className="deal-discount">
                      -{Math.round(100 - (deal.salePrice / deal.normalPrice) * 100)}%
                    </div>
                  </div>
                  <a 
                    href={`https://store.steampowered.com/app/${deal.steamAppID}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="deal-btn"
                  >
                    Ver en Steam
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DealsGallery;