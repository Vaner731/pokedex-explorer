import { useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import ListScreen from "./src/screens/ListScreen";
import DetailScreen from "./src/screens/DetailScreen";

// CONCEPTO: App.js guarda selectedId
// null = muestro lista, con id = muestro ficha
export default function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {selectedId === null ? (
        <ListScreen onSelectPokemon={setSelectedId} />
      ) : (
        <DetailScreen id={selectedId} onBack={() => setSelectedId(null)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
});
