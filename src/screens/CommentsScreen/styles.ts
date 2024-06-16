import { StyleSheet } from 'react-native';
import { colors, Metrics } from '../../helpers';

export const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: '600',
    color: colors.blue,
    marginBottom: 10,
    marginRight: 30,
  },
  avatar: {
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    height: 40,
    marginLeft: 'auto',
  },

  wrapper: {
    flex: 1,
    width: Metrics.width,
  },
  commentForm: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: colors.blue,
    borderTopWidth: 1,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderColor: colors.blue,
    color: colors.grey,
    marginRight: 10,
  },

  commentContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    maxHeight: 50,
  },
});
