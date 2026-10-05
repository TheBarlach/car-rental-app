import { Tabs } from 'expo-router';
import CarListScreen from "../../features/cars/screens/CarListScreen";

export default function TabsLayout() {
  return (
    <Tabs backBehavior="history"  >
      <Tabs.Screen name="index" options={{ title: 'Seach' }} />
        <Tabs.Screen name="map" options={{ title: 'Map' }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
    </Tabs>
  );
}
