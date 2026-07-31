import { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import DealCard from './DealCard';
import DealCardSkeleton from './DealCardSkeleton';
import { getStores, getDeals } from '../services/cheapShark';
import styles from './DealsGallery.module.css';

function DealsGallery() {
  const [deals, setDeals] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  const [selectedStore, setSelectedStore] = useState('');
  const [sortBy, setSortBy] = useState('Deal Rating');
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getStores().then(setStores);
  }, []);

  useEffect(() => {
    setPageNumber(0);
    setDeals([]);
    setHasMore(true);
  }, [selectedStore, sortBy]);

  useEffect(() => {
    if (pageNumber === 0) setLoading(true);
    else setLoadingMore(true);

    getDeals({ pageNumber, storeID: selectedStore, sortBy }).then(data => {
      if (data.length < 24) setHasMore(false);
      setDeals(prev => pageNumber === 0 ? data : [...prev, ...data]);
      setLoading(false);
      setLoadingMore(false);
    });
  }, [selectedStore, sortBy, pageNumber]);

  return (
    <div className={styles.pageWrapper}>
      {/* HEADER SEMÁNTICO */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.brand}>
            <span className={styles.logo}>🎮</span>
            <h1>DealHunter</h1>
          </div>
          <p className={styles.tagline}>Las mejores ofertas en tiempo real</p>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className={styles.mainContainer}>
        <section className={styles.controlsSection}>
          <FilterBar 
            stores={stores}
            selectedStore={selectedStore}
            setSelectedStore={setSelectedStore}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.grid}>
            {loading
              ? Array.from({ length: 12 }).map((_, i) => <DealCardSkeleton key={i} />)
              : deals.map(deal => <DealCard key={deal.dealID} deal={deal} stores={stores} />)
            }
          </div>

          {!loading && hasMore && (
            <div className={styles.pagination}>
              <button 
                className={styles.loadMoreBtn} 
                onClick={() => setPageNumber(prev => prev + 1)}
                disabled={loadingMore}
              >
                {loadingMore ? 'Cargando...' : 'Cargar más ofertas'}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* FOOTER SEMÁNTICO */}
      <footer className={styles.footer}>
        <p>Desarrollado con datos de la API de CheapShark.</p>
      </footer>
    </div>
  );
}

export default DealsGallery;