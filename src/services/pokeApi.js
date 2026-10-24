// CONCEPTO: este archivo solo habla con la API; no sabe nada de JSX ni estilos
import { getIdFromUrl } from "../utils/format";
const BASE_URL = "https://pokeapi.co/api/v2";
const ARTWORK_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";
export const PAGE_SIZE = 20;
const getArtworkUrl = (id) => `${ARTWORK_URL}/${id}.png`;
const fetchJson = async (path) => {
  // CONCEPTO: fetch devuelve una promesa; await espera la respuesta
  const response = await fetch(`${BASE_URL}${path}`);
  // CONCEPTO: un 404 responde texto plano, no JSON; se revisa antes de json()
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  return response.json();
};
export const getPokemonList = async (offset = 0) => {
  const data = await fetchJson(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  if (!data) throw new Error("No se encontró la lista");
  return {
    results: data.results.map(({ name, url }) => {
      const id = getIdFromUrl(url);
      return { id, name, imageUrl: getArtworkUrl(id) };
    }),
    hasMore: data.next !== null,
  };
};
export const getPokemon = async (nameOrId) => {
  const query = String(nameOrId).trim().toLowerCase();
  if (query === "") return null;
  const data = await fetchJson(`/pokemon/${encodeURIComponent(query)}`);
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    types: data.types.map((i) => i.type.name),
    stats: data.stats.map((i) => ({ name: i.stat.name, value: i.base_stat })),
    imageUrl:
      data.sprites?.other?.["official-artwork"]?.front_default ??
      getArtworkUrl(data.id),
  };
};
