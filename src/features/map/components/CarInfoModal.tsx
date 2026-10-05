import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';

import type {Car} from '../../../data/mockCars';

type CarInfoModalProps = {
    car: Car | null;
    onClose: () => void;
    onOpen?: (car: Car) => void;
};

export function CarInfoModal({car, onClose, onOpen}: CarInfoModalProps) {
    if (!car) {
        return null;
    }

    const rows = [
        {
            label: 'Brand/model',
            value: car.name,
            icon: require('../assets/icons/car-side-placeholder.png'),
        },
        {
            label: 'Year',
            value: car.year ? String(car.year) : '-',
            icon: require('../assets/icons/calendar-placeholder.png'),
        },
        {
            label: 'Kilometer',
            value: car.kilometer ?? '-',
            icon: require('../assets/icons/km-placeholder.png'),
        },
        {
            label: 'Fuel type',
            value: car.fuelType,
            icon: require('../assets/icons/fuel-type-placeholder.png'),
        },
        {
            label: 'Gearbox',
            value: car.gearType,
            icon: require('../assets/icons/gear-placeholder.png'),
        },
        {
            label: 'Price',
            value: `${car.pricePerDay} kr/day`,
            icon: require('../assets/icons/price-placeholder.png'),
        },
        {
            label: 'Registration number',
            value: car.registrationNumber,
            icon: require('../assets/icons/reg-placeholder.png'),
        },
    ];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={Boolean(car)}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Car information</Text>
                    <Text style={styles.subtitle}>Specifications of the selected car</Text>
                    
                    {rows.map((row) => (
                        <View key={row.label} style={styles.row}>
                         <Image
                            source={row.icon}
                            resizeMode="contain"
                            style={styles.specificationIcon}
                        />

                            <Text style={styles.label}>{row.label}</Text>
                            <Text style={styles.value}>{row.value}</Text>
                        </View>
                    ))}

                    <View style={styles.actions}>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => onOpen?.(car)}
                            style={styles.openButton}
                        >
                            <Text style={styles.openText}>Open</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(15, 23, 42, 0.35)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: '#f5f6fb',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },
    specificationIcon: {
        height: 22,
        marginRight: 10,
        tintColor: '#00b7c7',
        width: 22,
    },
    title: {
        color: '#20232d',
        fontSize: 18,
        fontWeight: '700',
    },
    subtitle: {
        color: '#8a8d98',
        marginBottom: 14,
        marginTop: 3,
    },
    row: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#d8d4ff',
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 8,
        minHeight: 50,
        paddingHorizontal: 14,
    },
    label: {
        color: '#4d505b',
        flex: 1,
        fontSize: 14,
    },
    value: {
        color: '#343640',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 12,
        maxWidth: '55%',
        textAlign: 'right',
    },
    actions: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 8,
    },
    closeButton: {
        padding: 14,
    },
    closeText: {
        color: '#777b86',
    },
    openButton: {
        backgroundColor: '#7138e8',
        borderRadius: 12,
        paddingHorizontal: 38,
        paddingVertical: 13,
    },
    openText: {
        color: '#ffffff',
        fontWeight: '700',
    },
});