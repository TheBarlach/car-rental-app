import { ScrollView, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Avatar, Logo, ScreenHeader } from '../../../components';
import { BottomNavigation } from '../../../navigation/BottomNavigation';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { styles } from './EntryScreen.styles';

export type EntryScreenProps = Partial<
  NativeStackScreenProps<RootStackParamList, 'Entry'>
>;

export function EntryScreen({ navigation }: EntryScreenProps) {
  const handleTabPress = () => navigation?.navigate('Search');

  return (
    <View style={styles.screen}>
      <View style={styles.headerArea}>
        <ScreenHeader
          left={<Logo variant="mark" />}
          right={
            <Avatar
              initials="AB"
              accessibilityLabel="Profile"
              onPress={() => {}}
            />
          }
        />
      </View>
      <ScrollView style={styles.card} contentContainerStyle={styles.cardContent}>
        <Text style={styles.title}>Choose a start screen</Text>
        <Text style={styles.body}>
          This placeholder exists so the app has somewhere to boot while the team
          decides which screen comes first. The branches currently disagree:
          feature/auth-screens and feat/car-setting-page start on Login, while
          feat/settings-page and feat/admin-page start on Settings.
        </Text>
        <Text style={styles.body}>
          Search is built and reachable from the Search tab below.
        </Text>
      </ScrollView>
      <BottomNavigation onTabPress={handleTabPress} />
    </View>
  );
}
