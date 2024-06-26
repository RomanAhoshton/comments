import { StyleSheet } from 'react-native';
import { colors, space } from '../../helpers';
import { useTheme } from '../../hooks/useTheme';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: space.large,
  },

  textBlock: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 40,
    fontWeight: '600',
    color: colors.blue,
    marginBottom: space.large,
  },
  keyboardAvoiding: {
    flex: 1,
  },

  actions: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
});
