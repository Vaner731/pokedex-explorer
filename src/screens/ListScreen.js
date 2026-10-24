import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getPokemonList } from '../services/pokeApi';
import PokemonCard from '../components/PokemonCard';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import { spacing } from '../theme/colors';

export default function ListScreen({ onSelect }) {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  // CONCEPTO: loadingMore evita pedir la misma página dos veces al bajar rápido
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadPokemon = async () => {
    const isFirstLoad = offset === 0 && pokemon.length === 0;
    if (isFirstLoad) setLoading(true);
    else setLoadingMore(true);
    
    setError(null);

    try {
      const data = await getPokemonList(offset);
      setPokemon(prev => isFirstLoad ? data.results : [...prev, ...data.results]);
      setOffset(prev => prev + 20);
      setHasMore(data.hasMore);
    } catch (err) {
      setError('No se pudo cargar la lista. Revisa tu conexión.');
    } finally {
      // CONCEPTO: finally corre con éxito o con error; aquí apagamos los indicadores
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // CONCEPTO: [] ejecuta solo al montar; sin array correría en cada render y se repetiría sin parar
  useEffect(() => {
    loadPokemon();
  }, []);

  // CONCEPTO: onEndReached avisa que el usuario llegó al final, momento de pedir más
  const handleEndReached = () => {
    if (loading || loadingMore || !hasMore || error) return;
    loadPokemon();
  };

  if (loading) return <LoadingView message="Cargando Pokémon..." />;
  
  // Si error en la primera carga, pantalla completa
  if (error && pokemon.length === 0) {
    return <ErrorView message={error} onRetry={loadPokemon} />;
  }

  return (
    <View style={styles.container}>
      {/* CONCEPTO: FlatList solo renderiza lo visible; ScrollView con map renderizaría todo */}
      <FlatList
        data={pokemon}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelect} />}
        contentContainerStyle={styles.list}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <LoadingView message="Cargando más..." />
          ) : error ? (
            <ErrorView message={error} onRetry={loadPokemon} />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { paddingHorizontal: spacing.sm, paddingBottom: spacing.lg },
});