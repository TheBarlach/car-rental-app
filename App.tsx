import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { SearchScreen } from './src/features/search/screens/SearchScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <SearchScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}