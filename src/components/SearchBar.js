import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

export default function SearchBar({ onSearch, disabled }) {
    // CONCEPTO: TextInput controlado, value + onChangeText mantienen el texto en el estado
    const [text, setText] = useState('');

    const handleSubmit = () => {
        if (text.trim() === '') return;
        onSearch(text);
    };

    return (
        <View style={styles.row}>
            <TextInput
                style={styles.input}
                placeholder="Busca por nombre o número..."
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button title="Buscar" onPress={handleSubmit} color={colors.primary} disabled={disabled} />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.sm,
        gap: spacing.sm,
    },
    input: {
        flex: 1,
        height: 44,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: spacing.md,
    },
});
