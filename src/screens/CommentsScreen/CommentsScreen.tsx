import {
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useLogOut } from '../../hooks/useLogOut';
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../helpers';
import { getAuth } from 'firebase/auth';
import { styles } from './styles';
import Avatar from '../../components/Avatar';

const CommentsScreen = () => {
  const { LogOut } = useLogOut();
  const navigation = useNavigation();
  const currentUser = getAuth().currentUser;

  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const scrollToItem = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.black,
        padding: 10,
      },

      headerTitleStyle: {
        color: colors.blue,
        fontSize: 20,
        fontWeight: '600',
      },
      headerBackTitleStyle: {
        color: colors.blue,
      },
      headerTintColor: colors.blue,
      headerTitleAlign: 'center',
      headerTitle: () => {
        return '';
      },
      headerRight: () => {
        return (
          <Pressable
            onPress={LogOut}
            style={{
              borderWidth: 2,
              padding: 5,
              borderColor: colors.blue,
              borderRadius: 15,
              marginBottom: 10,
              marginLeft: 20,
            }}
          >
            <Text style={styles.logOutBtn}>Log out</Text>
          </Pressable>
        );
      },

      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => {
        return <Avatar user={currentUser} />;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.todoContainer}>
        {/* <FlatList
          ref={flatListRef}
          data={todo}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TodoTask item={item} index={index} />
          )}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        /> */}
      </View>
      <KeyboardAvoidingView
        behavior={inputRef.current ? 'padding' : 'height'}
        style={styles.todoForm}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={[styles.todoInput]}
              multiline
              placeholder='Add Comment...'
              placeholderTextColor={colors.white}
              // value={todoText}
              // onChangeText={handleChangeText}
              // onEndEditing={({ nativeEvent }) =>
              //   handleChangeText(nativeEvent.text)
              // }
            />
            <Pressable onPress={() => console.log(1)}>
              <Text style={styles.addTodoBtn}>ADD COMMENT</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;
