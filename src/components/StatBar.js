import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/colors';

const MAX_STAT = 255; // valor máximo posible de una estadística base

const STAT_LABELS = {
    hp: 'PS',
    attack: 'Ataque',
    defense: 'Defensa',
    'special-attack': 'Ataque esp.',
    'special-defense': 'Defensa esp.',
    speed: 'Velocidad',
};

export default function StatBar({ name, value }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
            <Text style={styles.value}>{value}</Text>
            <View style={styles.track}>
                {/* CONCEPTO: el ancho de la barra se calcula a partir del dato (valor / máximo) */}
                <View style={[styles.fill, { width: `${(value / MAX_STAT) * 100}%` }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.sm,
    },
    label: {
        width: 100,
        color: colors.textMuted,
    },
    value: {
        width: 32,
        textAlign: 'right',
        fontWeight: 'bold',
        color: colors.text,
    },
    track: {
        flex: 1,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.barTrack,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: colors.primary,
    },
});

