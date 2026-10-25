// CONCEPTO: este archivo solo habla con la API; no sabe nada de JSX ni de estilos
import { getIdFromUrl } from '../utils/format';

const BASE_URL = 'https://pokeapi.co/api/v2';
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const PAGE_SIZE = 20;

const getArtworkUrl = (id) => `${ARTWORK_URL}/${id}.png`;

// Devuelve el JSON de la respuesta, o null si el recurso no existe (404).
// Lanza un error si falla la red o el servidor.
const fetchJson = async (path) => {
  // CONCEPTO: fetch devuelve una promesa; await espera la respuesta antes de seguir
  const response = await fetch(`${BASE_URL}${path}`);

  // CONCEPTO: un 404 responde texto plano, no JSON; por eso se revisa antes de llamar json()
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);

  return response.json();
};

// Una página de Pokémon: solo trae nombre y URL, el id sale del final de la URL
export const getPokemonList = async (offset = 0) => {
  const data = await fetchJson(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);

  if (!data) throw new Error('No se encontró la lista de Pokémon');

  return {
    results: data.results.map(({ name, url }) => {
      const id = getIdFromUrl(url);
      return { id, name, imageUrl: getArtworkUrl(id) };
    }),
    hasMore: data.next !== null,
  };
};

// La ficha de un Pokémon por nombre o número. Devuelve null si no existe.
export const getPokemon = async (nameOrId) => {
  // La API exige minúsculas y sin espacios al inicio o al final
  const query = String(nameOrId).trim().toLowerCase();
  if (query === '') return null;

  const data = await fetchJson(`/pokemon/${encodeURIComponent(query)}`);
  if (!data) return null;

  // Se devuelve solo lo que usa la app, ya ordenado
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((item) => item.type.name),
    stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
    imageUrl:
      data.sprites?.other?.['official-artwork']?.front_default ?? getArtworkUrl(data.id),
  };
};

