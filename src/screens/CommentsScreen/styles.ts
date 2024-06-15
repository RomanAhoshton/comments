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
  textLogo: {
    fontWeight: '500',
    fontSize: 20,
    color: colors.black,
  },
  logOutBtn: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    borderWidth: 1,
  },
  wrapper: {
    flex: 1,
    backgroundColor: colors.dark,
    width: Metrics.width,
  },
  todoForm: {
    backgroundColor: colors.black,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopColor: colors.blue,
    borderTopWidth: 1,
  },
  todoInput: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.dark,
    borderColor: colors.blue,
    color: colors.white,
    marginRight: 10,
  },
  addTodoBtn: {
    color: colors.blue,
    fontSize: 16,
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
