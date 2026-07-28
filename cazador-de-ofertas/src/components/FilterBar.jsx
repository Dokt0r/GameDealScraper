import styles from './FilterBar.module.css';

function FilterBar({ stores, selectedStore, setSelectedStore, sortBy, setSortBy }) {
  return (
    <div className={styles.filtersBar}>
      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Filtrar por Tienda</label>
        <select 
          className={styles.filterSelect} 
          value={selectedStore} 
          onChange={(e) => setSelectedStore(e.target.value)}
        >
          <option value="">Todas las tiendas</option>
          {stores.map(store => (
            <option key={store.storeID} value={store.storeID}>
              {store.storeName}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>Ordenar por</label>
        <select 
          className={styles.filterSelect} 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="Deal Rating">Relevancia del Descuento</option>
          <option value="Price">Precio (Más barato)</option>
          <option value="Savings">Mayor % de descuento</option>
          <option value="Title">Orden Alfabético</option>
          <option value="Metacritic">Nota en Metacritic</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;