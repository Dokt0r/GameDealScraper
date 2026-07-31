export const getHighResImage = (deal) => {
  const thumb = deal.thumb || '';

  // 1. Si tenemos el ID oficial de Steam
  if (deal.steamAppID && deal.steamAppID !== "0") {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${deal.steamAppID}/header.jpg`;
  }

  // 2. Extraer ID numérico de Steam desde el thumbnail
  const steamMatch = thumb.match(/steam\/apps\/(\d+)/);
  if (steamMatch) {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${steamMatch[1]}/header.jpg`;
  }

  // 3. Epic Games (Limpiar todos los parámetros de redimensionamiento)
  if (thumb.includes('epicgames.com')) {
    return thumb.split('?')[0]; 
  }

  // 4. GOG (Quitar los sufijos de recorte)
  if (thumb.includes('gog-statics.com')) {
    return thumb.replace(/_bg_crop_\d+x\d+/, '').replace(/_\d+$/, '');
  }

  // 5. Humble Bundle (Suelen usar imgix con parámetros de auto-compresión)
  if (thumb.includes('hb.imgix.net')) {
    return thumb.split('?')[0];
  }

  // 6. Si no es ninguna de las anteriores, devolvemos la miniatura
  // Ahora el CSS (object-fit: contain) se encargará de que no se vea estirada y fea.
  return thumb;
};