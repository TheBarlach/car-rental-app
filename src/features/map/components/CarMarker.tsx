import { Image, Pressable, StyleSheet } from 'react-native';

import type { MapCar } from '../map.types';

type CarMarkerProps = {
	car: MapCar;
	onPress: (car: MapCar) => void;
};

export function CarMarker({ car, onPress }: CarMarkerProps) {
	return (
		<Pressable
			accessibilityLabel={`Select ${car.name} at ${car.locationName}`}
			onPress={() => onPress(car)}
			style={({ pressed }) => [styles.marker, pressed && styles.pressed]}
		>
			<Image resizeMode="contain" source={require('../assets/car-placeholder.png')} style={styles.icon} />
		</Pressable>
	);
}

const styles = StyleSheet.create({
	marker: {
		alignItems: 'center',
		height: 40,
		justifyContent: 'center',
		width: 40,
	},
	pressed: {
		opacity: 0.65,
		transform: [{ scale: 0.92 }],
	},
	icon: {
		width: 30,
		height: 30,
	},
});
