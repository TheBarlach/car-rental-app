import { StyleSheet } from 'react-native';

import { colors } from '../theme';

export const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.accentSoft,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textStrong,
  },
});
