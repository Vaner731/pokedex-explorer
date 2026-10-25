// Tipo de la API (en inglés) -> etiqueta en español + color propio del tipo
export const POKEMON_TYPES = {
  normal: { label: 'normal', color: '#A8A77A' },
  fire: { label: 'fuego', color: '#EE8130' },
  water: { label: 'agua', color: '#6390F0' },
  electric: { label: 'eléctrico', color: '#E0B800' },
  grass: { label: 'planta', color: '#7AC74C' },
  ice: { label: 'hielo', color: '#5FBDB8' },
  fighting: { label: 'lucha', color: '#C22E28' },
  poison: { label: 'veneno', color: '#A33EA1' },
  ground: { label: 'tierra', color: '#C9A53C' },
  flying: { label: 'volador', color: '#A98FF3' },
  psychic: { label: 'psíquico', color: '#F95587' },
  bug: { label: 'bicho', color: '#A6B91A' },
  rock: { label: 'roca', color: '#B6A136' },
  ghost: { label: 'fantasma', color: '#735797' },
  dragon: { label: 'dragón', color: '#6F35FC' },
  dark: { label: 'siniestro', color: '#705746' },
  steel: { label: 'acero', color: '#8E8EAD' },
  fairy: { label: 'hada', color: '#D685AD' },
};

// Por si la API agrega un tipo nuevo que todavía no está en la tabla
export const UNKNOWN_TYPE = { label: 'desconocido', color: '#9E9E9E' };
