import { Button, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

// CONCEPTO: estado "error", mensaje claro y una función recibida por props para reintentar
export default function ErrorView({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Reintentar" onPress={onRetry} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  text: {
    color: colors.text,
    textAlign: 'center',
  },
});
