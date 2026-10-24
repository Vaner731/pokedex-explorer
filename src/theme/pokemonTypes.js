export const POKEMON_TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const POKEMON_TYPE_LABELS = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

export function getTypeColor(type) {
  return POKEMON_TYPE_COLORS[type] || '#777777';
}

export function getTypeLabel(type) {
  return POKEMON_TYPE_LABELS[type] || type;
}
export const POKEMON_TYPES = {
  normal: { label: 'normal', color: '#A8A77A' }, fire: { label: 'fuego', color: '#EE8130' }, water: { label: 'agua', color: '#6390F0' }, electric: { label: 'eléctrico', color: '#E0B800' }, grass: { label: 'planta', color: '#7AC74C' }, ice: { label: 'hielo', color: '#5FBDB8' }, fighting: { label: 'lucha', color: '#C22E28' }, poison: { label: 'veneno', color: '#A33EA1' }, ground: { label: 'tierra', color: '#C9A53C' }, flying: { label: 'volador', color: '#A98FF3' }, psychic: { label: 'psíquico', color: '#F95587' }, bug: { label: 'bicho', color: '#A6B91A' }, rock: { label: 'roca', color: '#B6A136' }, ghost: { label: 'fantasma', color: '#735797' }, dragon: { label: 'dragón', color: '#6F35FC' }, dark: { label: 'siniestro', color: '#705746' }, steel: { label: 'acero', color: '#8E8EAD' }, fairy: { label: 'hada', color: '#D685AD' },
};
export const UNKNOWN_TYPE = { label: 'desconocido', color: '#9E9E9E' };