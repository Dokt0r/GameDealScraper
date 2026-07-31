const BASE_URL = 'https://www.cheapshark.com/api/1.0';

export const getStores = async () => {
  try {
    const res = await fetch(`${BASE_URL}/stores`);
    if (!res.ok) throw new Error('Error al cargar las tiendas');
    const data = await res.json();
    return data.filter(store => store.isActive === 1);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getDeals = async ({ pageNumber = 0, storeID = '', sortBy = 'Deal Rating' }) => {
  try {
    let url = `${BASE_URL}/deals?pageSize=24&pageNumber=${pageNumber}&sortBy=${sortBy}`;
    if (storeID) url += `&storeID=${storeID}`;
    
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al cargar las ofertas');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};