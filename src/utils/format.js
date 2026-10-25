// Número con 3 dígitos: 25 -> "#025"
// CONCEPTO: padStart rellena con ceros a la izquierda hasta completar la longitud
export const padId = (id) => `#${String(id).padStart(3, '0')}`;

// "pikachu" -> "Pikachu"
export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
export const getIdFromUrl = (url) => Number(url.split('/').filter(Boolean).pop());

// La API entrega la altura en decímetros y el peso en hectogramos
export const toMeters = (decimeters) => decimeters / 10;
export const toKilograms = (hectograms) => hectograms / 10;

