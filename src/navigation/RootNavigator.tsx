import { Stack } from 'expo-router';
export default function RootNavigator() {
    return (
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
            <Stack.Screen
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="login"
                options={{ title: 'Log ind' }}
            />
            <Stack.Screen
                name="forgotpassword"
                options={{ title: 'Nulstil adgangskode' }}
            />
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="cars/[id]"
                options={{ title: 'Bildetaljer' }}
            />
            <Stack.Screen
                name="bookings/create"
                options={{ title: 'Book bil' }}
            />
            <Stack.Screen
                name="bookings/payment"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="register"
                options={{ title: 'Opret konto' }}
            />
        </Stack>
    );
}
