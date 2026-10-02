import { StyleSheet } from 'react-native';

import { hitTarget } from '../theme';

export const styles = StyleSheet.create({
  container: {
    minHeight: hitTarget.min,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  center: {
    alignItems: 'center',
  },
  sideRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
