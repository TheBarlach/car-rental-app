import { useState } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { CarMarker } from './components/CarMarker';
import { CarInfoModal } from './components/CarInfoModal';
import type { MapCar } from './map.types';

type MapScreenProps = {
    cars: MapCar[];
    searchTerm?: string;
    onCarSelect?: (car: MapCar) => void;
};

export function MapScreen({ cars, searchTerm = '', onCarSelect }: MapScreenProps) {
    const [selectedCar, setSelectedCar] = useState<MapCar | null>(null);
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const visibleCars = cars.filter((car) => {
        const matchesSearch =
            normalizedSearchTerm.length === 0 ||
            car.name.toLowerCase().includes(normalizedSearchTerm);

        return car.isAvailable && matchesSearch;
    });

    const handleCarPress = (car: MapCar) => {
        setSelectedCar(car);
        onCarSelect?.(car);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>Available cars</Text>
                <Text style={styles.subtitle}>
                    {visibleCars.length} collection {visibleCars.length === 1 ? 'point' : 'points'}
                </Text>
            </View>

            <View style={styles.mapFrame}>
                <ImageBackground
                    resizeMode="cover"
                    source={require('./assets/map-placeholder.png')}
                    style={styles.map}
                >
                    {visibleCars.map((car) => (
                        <View
                            key={car.id}
                            style={[
                                styles.markerPosition,
                                { left: `${car.longitude}%`, top: `${car.latitude}%` },
                            ]}
                        >
                            <CarMarker car={car} onPress={handleCarPress} />
                        </View>
                    ))}
                </ImageBackground>
            </View>

            <CarInfoModal
                car={selectedCar}
                onClose={() => setSelectedCar(null)}
                onOpen={(car) => {
                    // Can use later when we can redirect to car pages.
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
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 14,
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