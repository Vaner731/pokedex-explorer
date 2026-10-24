// CONCEPTO: padStart rellena con ceros a la izquierda
export const padId = (id) => `#${String(id).padStart(3,'0')}`;
export const capitalize = (t) => t.charAt(0).toUpperCase()+t.slice(1);
export const getIdFromUrl = (url) => Number(url.split('/').filter(Boolean).pop());
export const toMeters = (d) => d/10;
export const toKilograms = (h) => h/10;
