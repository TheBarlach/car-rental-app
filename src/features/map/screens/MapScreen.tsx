import { useState, type ReactNode } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CarMarker } from '../components/CarMarker';
import { CarInfoModal } from '../components/CarInfoModal';
import type { Car, CarLocation } from '../../../data/mockCars';

type MapCar = Car & { location: CarLocation };

type MapScreenProps = {
    cars: Car[];
    searchTerm?: string;
    onCarSelect?: (car: Car) => void;
    onOpenCar?: (car: Car) => void;
    // Rendered below the map, e.g. BottomNavigation.
    footer?: ReactNode;
    // Rendered in the top-right corner of the header, e.g. SettingsIcon.
    headerRight?: ReactNode;
};

export function MapScreen({ cars, searchTerm = '', onCarSelect, onOpenCar, footer, headerRight }: MapScreenProps) {
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    // Only available cars with a pick-up location can be shown on the map.
    const visibleCars = cars.filter((car): car is MapCar => {
        const matchesSearch =
            normalizedSearchTerm.length === 0 ||
            car.name.toLowerCase().includes(normalizedSearchTerm);

        return car.status === 'active' && Boolean(car.location) && matchesSearch;
    });

    const handleCarPress = (car: Car) => {
        setSelectedCar(car);
        onCarSelect?.(car);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.title}>Available cars</Text>
                    <Text style={styles.subtitle}>
                        {visibleCars.length} collection {visibleCars.length === 1 ? 'point' : 'points'}
                    </Text>
                </View>
                {headerRight}
            </View>

            <View style={styles.mapFrame}>
                <ImageBackground
                    resizeMode="cover"
                    source={require('../assets/map-placeholder.png')}
                    style={styles.map}
                >
                    {visibleCars.map((car) => (
                        <View
                            key={car.id}
                            style={[
                                styles.markerPosition,
                                { left: `${car.location.longitude}%`, top: `${car.location.latitude}%` },
                            ]}
                        >
                            <CarMarker car={car} onPress={handleCarPress} />
                        </View>
                    ))}
                </ImageBackground>
            </View>

            {footer}

            <CarInfoModal
                car={selectedCar}
                onClose={() => setSelectedCar(null)}
                onOpen={(car) => {
                    // Close the modal first so it doesn't stay on top of the next screen.
                    setSelectedCar(null);
                    onOpenCar?.(car);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#f4f7f6',
        flex: 1,
    },
    header: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 14,
    },
    headerText: {
        flex: 1,
    },
    title: {
        color: '#12302d',
        fontSize: 26,
        fontWeight: '700',
    },
    subtitle: {
        color: '#58706c',
        fontSize: 15,
        marginTop: 4,
    },
    mapFrame: {
        flex: 1,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    markerPosition: {
        position: 'absolute',
        transform: [{ translateX: -24 }, { translateY: -24 }],
    },
});