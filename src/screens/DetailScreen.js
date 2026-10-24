import { useEffect, useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getPokemon } from '../services/pokeApi';
import { capitalize, padId, toKilograms, toMeters } from '../utils/format';
import LoadingView from '../components/LoadingView';
import ErrorView from '../components/ErrorView';
import TypeBadge from '../components/TypeBadge';
import { colors, spacing } from '../theme/colors';
const DETAIL_ERROR = 'No se pudo cargar la ficha. Revisa tu conexión e inténtalo de nuevo.';
export default function DetailScreen({ pokemonId, onBack }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const loadPokemon = async () => {
    setLoading(true); setError(null);
    try { const data = await getPokemon(pokemonId); if (data) setPokemon(data); else setError('No se encontró este Pokémon.'); } 
    catch { setError(DETAIL_ERROR); } finally { setLoading(false); }
  };
  // CONCEPTO: [pokemonId] repite la petición solo cuando cambia el Pokémon elegido
  useEffect(() => { loadPokemon(); }, [pokemonId]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* CONCEPTO: Button recibe la función onBack del padre para volver a la lista */}
      <Button title="Volver a la lista" onPress={onBack} color={colors.primary} />
      {loading && <LoadingView message="Cargando ficha..." />}
      {error && <ErrorView message={error} onRetry={loadPokemon} />}
      {pokemon && (
        <View style={styles.content}>
          {/* CONCEPTO: imagen remota con width y height explícitos */}
          <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
          <Text style={styles.number}>{padId(pokemon.id)}</Text>
          <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
          <View style={styles.types}>{pokemon.types.map((type) => (<TypeBadge key={type} type={type} />))}</View>
          <View style={styles.measures}>
            <View style={styles.measure}><Text style={styles.measureValue}>{toMeters(pokemon.height).toFixed(1)} m</Text><Text style={styles.measureLabel}>Altura</Text></View>
            <View style={styles.measure}><Text style={styles.measureValue}>{toKilograms(pokemon.weight).toFixed(1)} kg</Text><Text style={styles.measureLabel}>Peso</Text></View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { padding: spacing.md }, content: { alignItems: 'center', paddingTop: spacing.md }, image: { width: 240, height: 240 }, number: { color: colors.textMuted }, name: { fontSize: 28, fontWeight: 'bold', color: colors.text }, types: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }, measures: { flexDirection: 'row', gap: spacing.xl, marginVertical: spacing.lg }, measure: { alignItems: 'center' }, measureValue: { fontSize: 20, fontWeight: 'bold' }, measureLabel: { color: colors.textMuted } });