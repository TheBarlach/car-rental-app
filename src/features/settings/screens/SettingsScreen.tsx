import React from 'react';
import { Text, View } from 'react-native';

type SettingsScreenProps = {
  user: {
    name: string;
    email: string;
  };
  onNavigate: (screen: string) => void;
  onLogout: () => void;
};

export default function SettingsScreen({
  user,
}: SettingsScreenProps) {
  return (
    <View>
      <Text>Settings</Text>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}