import { StyleSheet, Text, View } from 'react-native';
import { POKEMON_TYPES, UNKNOWN_TYPE } from '../theme/pokemonTypes';
import { colors, spacing } from '../theme/colors';
export default function TypeBadge({ type }) {
  const { label, color } = POKEMON_TYPES[type] ?? UNKNOWN_TYPE;
  return (<View style={[styles.badge, { backgroundColor: color }]}><Text style={styles.text}>{label}</Text></View>);
}
const styles = StyleSheet.create({ badge: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: 16 }, text: { color: colors.white, fontWeight: 'bold' } });