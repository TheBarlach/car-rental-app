import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EntryScreen } from '../features/entry/screens/EntryScreen';
import { SearchScreen } from '../features/search/screens/SearchScreen';

export type RootStackParamList = {
  Entry: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Entry"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
