import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../../../components/Button';
import { getCarById } from '../carService';
import { defaultInsuranceOptions } from '../../../data/mockCars';
import type { Car } from '../carService';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;

export default function CarDetailsScreen({ navigation, route }: Props) {
    // Show the first mock car if no ID was passed.
    const carId = route.params?.id ?? '1';

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
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    if (error || !car) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.description}>{error ?? 'Car not found.'}</Text>
                <Button
                    title="Back to search"
                    onPress={() => navigation.replace('Search')}
                />
            </SafeAreaView>
        );
    }

    const specifications = [
        { label: 'Year', value: car.year?.toString() },
        { label: 'Kilometer', value: car.kilometer?.toString() },
        { label: 'Fuel type', value: car.fuelType },
        { label: 'Gearbox', value: car.gearType },
        { label: 'Seats', value: car.capacity },
        { label: 'Location', value: car.location?.name },
    ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value));

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.header}>
                <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                    onPress={() => navigation.goBack()}
                    hitSlop={12}
                >
                    <Text style={styles.backArrow}>‹</Text>
                </Pressable>
                <Text style={styles.headerTitle}>Car details</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                style={styles.scroll}
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
                        <Text style={styles.heading}>Specifications</Text>
                        {specifications.map((spec) => (
                            <View key={spec.label} style={styles.row}>
                                <Text style={styles.secondary}>{spec.label}</Text>
                                <Text>{spec.value}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Insurance</Text>
                        <Dropdown
                            style={[
                                styles.dropdown,
                                selectedInsuranceId !== null && styles.dropdownSelected,
                            ]}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                            itemTextStyle={styles.dropdownItemText}
                            containerStyle={styles.dropdownList}
                            data={car.insuranceOptions ?? defaultInsuranceOptions}
                            labelField="name"
                            valueField="id"
                            placeholder="Select type of insurance"
                            value={selectedInsuranceId}
                            onChange={(item: (typeof defaultInsuranceOptions)[number]) =>
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
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Continue to Book"
                    onPress={() =>
                        navigation.navigate('Payment', {
                            carId: car.id,
                            car,
                            startDate: selectedStartDate.toISOString(),
                            endDate: selectedEndDate.toISOString(),
                        })
                    }
                />
            </View>
        </SafeAreaView>
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
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    backArrow: {
        width: 32,
        fontSize: 34,
        lineHeight: 38,
        color: '#17191F',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#17191F',
    },
    headerSpacer: {
        width: 32,
    },
    scroll: {
        flex: 1,
    },
    content: {
        paddingBottom: 24,
    },
    footer: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    dropdown: {
        minHeight: 52,
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: '#C9CED8',
        borderRadius: 12,
        backgroundColor: '#F7F8FB',
    },
    dropdownSelected: {
        borderColor: '#6266E9',
        backgroundColor: '#FFFFFF',
    },
    dropdownPlaceholder: {
        fontSize: 14,
        color: '#8990A0',
    },
    dropdownSelectedText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#25282D',
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#25282D',
    },
    dropdownList: {
        borderWidth: 1,
        borderColor: '#C9CED8',
        borderRadius: 12,
        overflow: 'hidden',
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
