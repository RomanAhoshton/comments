import { StyleSheet } from 'react-native';

import { colors, Metrics } from '../../helpers';

export const styles = StyleSheet.create({
  user: {
    position: 'relative',
    bottom: 10,
  },

  avatar: {
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  noImageAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    width: 50,
    borderRadius: 25,
    height: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.blue,
    backgroundColor: colors.dark,
  },
  textLogo: {
    fontWeight: '400',
    fontSize: 35,
    color: colors.blue,
  },
});
