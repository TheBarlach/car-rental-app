import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import SettingsRow from '../../../components/SettingsRow';
import BottomNavigation from '../../../components/BottomNavigation';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Settings</Text>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>MM</Text>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.name}>Maria Mikkelsen</Text>
                <Text style={styles.email}>maria.mikkelsen@gmail.com</Text>
              </View>
            </View>

            <View style={styles.settingsList}>
              <SettingsRow
                  title="Admin Page"
                  icon="settings-outline"
                  onPress={() => navigation.navigate('AdminPage')}
              />

              <SettingsRow
                title="Personal Information"
                icon="person-circle-outline"
                onPress={() => navigation.navigate('PersonalInformation')}
              />

              <SettingsRow
                title="Driver's License"
                icon="car-outline"
                onPress={() => navigation.navigate('DriversLicense')}
                rightText="Verified"
              />

              <SettingsRow
                title="Payment Methods"
                icon="card-outline"
                onPress={() => navigation.navigate('PaymentMethods')}
                rightText="2 cards"
              />

              <SettingsRow
                title="My Booking"
                icon="calendar-outline"
                onPress={() => navigation.navigate('Bookings')}
              />

              <View style={styles.notificationRow}>
                <View style={styles.notificationLeft}>
                  <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={colors.text}
                  />

                  <Text style={styles.notificationTitle}>
                    Notifications
                  </Text>
                </View>

                <View style={styles.switchContainer}>
                  <Switch
                      value={notificationsEnabled}
                      onValueChange={setNotificationsEnabled}
                  />
                  </View>
              </View>

              <SettingsRow
                title="Help & Support"
                icon="help-circle-outline"
                onPress={() => navigation.navigate('HelpSupport')}
              />

              <SettingsRow
                title="About Drive On The Go"
                icon="information-circle-outline"
                onPress={() => navigation.navigate('About')}
              />
            </View>

            <Pressable
              style={styles.logoutButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </ScrollView>
        </View>

        <BottomNavigation
          onSearch={() => navigation.navigate('Search')}
          onMap={() => navigation.navigate('Map')}
          onBookings={() => navigation.navigate('Bookings')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.sm,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: spacing.lg,
  },

  title: {
    ...typography.title,
    color: colors.text,
    marginBottom: spacing.lg,
  },

  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: spacing.md,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },

  avatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '700',
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },

  email: {
    fontSize: 13,
    color: colors.textLabel,
  },

  settingsList: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },

  notificationRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: colors.white,
  },

  switchContainer: {
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    },

  notificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  notificationIcon: {
    fontSize: 22,
    color: colors.text,
  },

  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },

  logoutButton: {
    marginTop: spacing.md,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },

  logoutText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '600',
  },
});