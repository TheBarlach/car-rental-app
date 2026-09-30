import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minHeight: 44,
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
