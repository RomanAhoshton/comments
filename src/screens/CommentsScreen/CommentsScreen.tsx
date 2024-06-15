import {
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
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
import { useComments } from '../../hooks/useComments';
import Comment from '../../components/Comment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CommentsScreen = () => {
  const { LogOut } = useLogOut();
  const { addComment, commentText, setCommentText, comments } = useComments();
  const navigation = useNavigation();
  const currentUser = getAuth().currentUser;
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const scrollToItem = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleAddComment = async (text: string) => {
    await addComment(text);
    scrollToItem(0);
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
      <View style={styles.commentContainer}>
        <FlatList
          ref={flatListRef}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Comment comment={item} />}
          inverted
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
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
              placeholder='Type Comment...'
              placeholderTextColor={colors.white}
              value={commentText}
              onChangeText={setCommentText}
              onEndEditing={({ nativeEvent }) =>
                setCommentText(nativeEvent.text)
              }
            />
            <Pressable onPress={() => handleAddComment(commentText)}>
              <MaterialCommunityIcons
                name='send-circle'
                size={45}
                color={colors.blue}
              />
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;
