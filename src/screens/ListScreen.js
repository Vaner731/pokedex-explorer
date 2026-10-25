import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { getPokemon, getPokemonList } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { colors, spacing } from '../theme/colors';

const LIST_ERROR = 'No se pudo cargar la lista. Revisa tu conexión e inténtalo de nuevo.';
const SEARCH_ERROR = 'No se pudo realizar la búsqueda. Revisa tu conexión e inténtalo de nuevo.';

export default function ListScreen({ onSelect }) {
  // CONCEPTO: useState guarda los datos y el estado de cada petición (cargando, error, éxito)
  const [pokemon, setPokemon] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); // primera página
  const [loadingMore, setLoadingMore] = useState(false); // páginas siguientes
  const [error, setError] = useState(null);
  // status: 'idle' | 'loading' | 'notFound' | 'error'
  const [search, setSearch] = useState({ status: 'idle', query: '' });

  // Carga los siguientes 20 a partir de los que ya se tienen
  const loadPokemon = async () => {
    const offset = pokemon.length;

    setError(null);
    if (offset === 0) setLoading(true);
    else setLoadingMore(true);

    // CONCEPTO: try/catch/finally, finally corre con éxito o con error y apaga los indicadores
    try {
      const page = await getPokemonList(offset);
      setPokemon((current) => [...current, ...page.results]);
      setHasMore(page.hasMore);
    } catch (err) {
      setError(LIST_ERROR);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // CONCEPTO: [] ejecuta el efecto solo al montar; sin array correría en cada render
  // y la petición se repetiría sin parar
  useEffect(() => {
    loadPokemon();
  }, []);

  // CONCEPTO: onEndReached avisa que el usuario llegó al final, el momento de pedir más
  const handleEndReached = () => {
    if (loading || loadingMore || !hasMore || error) return;
    loadPokemon();
  };

  // Una misma petición puede terminar de tres formas: encontrado, no existe o error
  const handleSearch = async (text) => {
    setSearch({ status: 'loading', query: text });

    try {
      const result = await getPokemon(text);

      if (result) {
        setSearch({ status: 'idle', query: '' });
        onSelect(result.id);
      } else {
        setSearch({ status: 'notFound', query: text });
      }
    } catch (err) {
      setSearch({ status: 'error', query: text });
    }
  };

  const showFullError = error && pokemon.length === 0;

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} disabled={search.status === 'loading'} />

      {/* CONCEPTO: renderizado condicional, según el estado se muestra un mensaje u otro */}
      {search.status === 'loading' && <LoadingView message="Buscando Pokémon..." />}
      {search.status === 'error' && (
        <ErrorView message={SEARCH_ERROR} onRetry={() => handleSearch(search.query)} />
      )}
      {search.status === 'notFound' && (
        <Text style={styles.message}>
          No se encontró ningún Pokémon con "{search.query.trim()}".
        </Text>
      )}

      {loading ? (
        <LoadingView message="Cargando Pokémon..." />
      ) : showFullError ? (
        <ErrorView message={error} onRetry={loadPokemon} />
      ) : (
        // CONCEPTO: FlatList solo renderiza lo visible; ScrollView con map renderizaría todo
        <FlatList
          data={pokemon}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelect} />}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.list}
          ListFooterComponent={
            loadingMore ? (
              <LoadingView message="Cargando más..." />
            ) : error ? (
              <ErrorView message={error} onRetry={loadPokemon} />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.lg,
  },
  message: {
    textAlign: 'center',
    color: colors.textMuted,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
});

