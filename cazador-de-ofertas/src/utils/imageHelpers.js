// src/utils/imageHelpers.js

export const getHighResImage = (deal) => {
  // 1. Si tiene un ID de Steam válido, usamos la portada oficial HD de Steam
  if (deal.steamAppID && deal.steamAppID !== "0") {
    return `https://cdn.cloudflare.steamstatic.com/steam/apps/${deal.steamAppID}/header.jpg`;
  }

  // 2. Si la imagen thumb viene de servidores de Steam pero es pequeña, la transformamos a HD
  if (deal.thumb && deal.thumb.includes('steamstatic')) {
    return deal.thumb
      .replace(/capsule_\d+x\d+\.jpg/, 'header.jpg')
      .replace(/capsule_sm_120\.jpg/, 'header.jpg');
  }

  // 3. Para el resto de tiendas, devolvemos la miniatura por defecto
  return deal.thumb;
};