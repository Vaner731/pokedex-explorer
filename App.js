import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// CONCEPTO: SafeAreaView evita que el contenido quede bajo el notch o la barra de estado
import { SafeAreaView } from 'react-native-safe-area-context';

import ListScreen from './src/screens/ListScreen';
import DetailScreen from './src/screens/DetailScreen';
import { colors, spacing } from './src/theme/colors';

export default function App() {
  // CONCEPTO: useState guarda qué Pokémon está abierto; null significa "mostrar la lista"
  const [selectedId, setSelectedId] = useState(null);
  const isDetailOpen = selectedId !== null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <Text style={styles.title}>PokéDex Explorer</Text>

      {/* La lista se oculta en vez de desmontarse, así conserva el scroll y los Pokémon ya cargados */}
      <View style={[styles.flex, isDetailOpen && styles.hidden]}>
        {/* CONCEPTO: el hijo avisa al padre con una función recibida por props */}
        <ListScreen onSelect={setSelectedId} />
      </View>

      {/* CONCEPTO: renderizado condicional, la ficha solo existe mientras hay un Pokémon elegido */}
      {isDetailOpen && (
        <DetailScreen pokemonId={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </SafeAreaView>
  );
}

// CONCEPTO: StyleSheet.create define los estilos una vez y se reutilizan por nombre
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    paddingVertical: spacing.md,
  },
  flex: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
});

