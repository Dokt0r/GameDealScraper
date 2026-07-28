import { useEffect, useState } from 'react';
import FilterBar from './FilterBar';
import DealCard from './DealCard';
import DealCardSkeleton from './DealCardSkeleton';
import styles from './DealsGallery.module.css';

function DealsGallery() {
  const [deals, setDeals] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Estados para Filtros y Paginación
  const [selectedStore, setSelectedStore] = useState('');
  const [sortBy, setSortBy] = useState('Deal Rating');
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // 1. Cargar las tiendas una sola vez
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then(res => res.json())
      .then(data => setStores(data.filter(s => s.isActive === 1)));
  }, []);

  // 2. Resetear a la página 0 cuando cambian los filtros
  useEffect(() => {
    setPageNumber(0);
    setDeals([]);
    setHasMore(true);
  }, [selectedStore, sortBy]);

  // 3. Petición a la API (se ejecuta al cambiar filtro o al incrementar página)
  useEffect(() => {
    if (pageNumber === 0) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    let apiUrl = `https://www.cheapshark.com/api/1.0/deals?pageSize=24&pageNumber=${pageNumber}&sortBy=${sortBy}`;
    if (selectedStore) apiUrl += `&storeID=${selectedStore}`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        // Si la API devuelve menos de 24 items, ya no hay más ofertas
        if (data.length < 24) setHasMore(false);

        if (pageNumber === 0) {
          setDeals(data);
        } else {
          // Concatenamos las nuevas ofertas a las existentes
          setDeals(prevDeals => [...prevDeals, ...data]);
        }
        
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }, [selectedStore, sortBy, pageNumber]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>🎮 Cazador de Chollos</h1>
        <p className={styles.subtitle}>Las mejores ofertas de juegos en tiempo real</p>
        
        <FilterBar 
          stores={stores}
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Grid de ofertas */}
        <div className={styles.grid}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <DealCardSkeleton key={index} />
              ))
            : deals.map(deal => (
                <DealCard key={deal.dealID} deal={deal} stores={stores} />
              ))
          }
        </div>

        {/* Botón Cargar Más */}
        {!loading && hasMore && (
          <div className={styles.loadMoreContainer}>
            <button 
              className={styles.loadMoreBtn} 
              onClick={() => setPageNumber(prev => prev + 1)}
              disabled={loadingMore}
            >
              {loadingMore ? 'Cargando más ofertas...' : 'Cargar más ofertas'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DealsGallery;