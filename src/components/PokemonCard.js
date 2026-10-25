import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { capitalize, padId } from '../utils/format';
import { colors, spacing } from '../theme/colors';

// CONCEPTO: Pressable reacciona al toque; el padre decide qué pasa con onPress
export default function PokemonCard({ pokemon, onPress }) {
  return (
    <Pressable style={styles.wrapper} onPress={() => onPress(pokemon.id)}>
      <View style={styles.card}>
        {/* CONCEPTO: una imagen remota no se ve sin width y height explícitos */}
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} />
        <Text style={styles.number}>{padId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // flex + maxWidth: 2 por fila, y si la última queda sola no se estira
  wrapper: {
    flex: 1,
    maxWidth: '50%',
    padding: spacing.xs,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    padding: spacing.sm,
  },
  image: {
    width: 120,
    height: 120,
  },
  number: {
    color: colors.textMuted,
    fontSize: 13,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
