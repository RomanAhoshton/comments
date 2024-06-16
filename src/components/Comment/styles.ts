import { colors } from '../../helpers';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  commentContainer: {
    borderColor: colors.blue,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  noImageAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.blue,
    marginRight: 10,
  },
  textLogo: {
    fontWeight: '400',
    fontSize: 25,
    color: colors.blue,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.blue,
  },
  timestamp: {
    color: colors.grey,
    fontSize: 12,
    marginTop: 10,
  },
  textMessage: {
    marginTop: 10,
    fontSize: 14,
    color: colors.blue,
    width: '80%',
  },

  textAnswer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  answer: {
    color: colors.grey,
  },
  arrow: {
    marginBottom: 15,
  },
});
