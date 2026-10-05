import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import Button from '../../../components/Button';
import { getCarById } from '../carService';
import type { Car } from '../carService';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;

export default function CarDetailsScreen({ navigation, route }: Props) {
    // Vis den første dummybil, hvis der ikke er sendt et ID.
    const carId = route.params?.id ?? 'car-001';

    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedInsuranceId, setSelectedInsuranceId] = useState<string | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    useEffect(() => {
        let active = true;

        async function loadCar() {
            setLoading(true);
            setError(null);
            setCar(null);

            try {
                const data = await getCarById(carId);

                if (active) {
                    setCar(data);
                    if (!data) {
                        setError(`The car could not be found.`);
                    }
                }
            } catch {
                if (active) {
                    setError('Could not load the car. Please try again.');
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadCar();

        return () => {
            active = false;
        };
    }, [carId]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !car) {
        return (
            <View style={styles.centered}>
                <Text style={styles.description}>{error ?? 'Car not found.'}</Text>
                <Button
                    title="Back to search"
                    onPress={() => navigation.replace('Search')}
                />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.content}
        >
            <View style={styles.details}>
                <View style={styles.row}>
                    <Text style={[styles.title, styles.carName]}>
                        {car.name}
                    </Text>

                    <Text style={styles.title}>
                        {car.pricePerDay} kr/day
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.secondary}>
                        Registration number
                    </Text>

                    <Text>{car.registrationNumber}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>About this car</Text>

                    <Text style={styles.description}>
                        {car.description}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Insurance</Text>
                    <Dropdown
                        data={car.insuranceOptions}
                        labelField="name"
                        valueField="id"
                        placeholder="Select type of insurance"
                        value={selectedInsuranceId}
                        onChange={(item: Car['insuranceOptions'][number]) =>
                            setSelectedInsuranceId(item.id)
                        }
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>Start date</Text>
                    <DateTimePicker
                        value={selectedStartDate}
                        mode="date"
                        maximumDate={selectedEndDate}
                        onValueChange={(_, date) => setSelectedStartDate(date)}
                    />
                    <Text style={styles.heading}>End date</Text>
                    <DateTimePicker
                        value={selectedEndDate}
                        mode="date"
                        minimumDate={selectedStartDate}
                        onValueChange={(_, date) => setSelectedEndDate(date)}
                    />
                </View>

                <Button
                    title="Continue to Book"
                    onPress={() =>
                        navigation.navigate('Payment', { carId: car.id })
                    }
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#FFFFFF',
    },
    content: {
        paddingBottom: 24,
    },
    details: {
        padding: 24,
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#25282D',
    },
    carName: {
        flex: 1,
    },
    secondary: {
        fontSize: 12,
        color: '#666666',
    },
    section: {
        gap: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: '700',
        color: '#25282D',
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#444444',
    },
});
