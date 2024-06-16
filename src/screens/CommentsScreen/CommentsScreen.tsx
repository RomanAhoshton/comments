import {
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { useLogOut } from '../../hooks/useLogOut';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../helpers';
import { getAuth } from 'firebase/auth';
import { styles } from './styles';
import Avatar from '../../components/Avatar';
import { useComments } from '../../hooks/useComments';
import Comment from '../../components/Comment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CLoader from '../../components/CLoader';
import { useTheme } from '../../hooks/useTheme';
import { Comment as CommentType } from '../../types';
import Header from '../../components/Header';

interface ItemProp {
  item: CommentType;
}

const CommentsScreen = () => {
  const { theme } = useTheme();
  const { LogOut } = useLogOut();
  const [open, setOpen] = useState(false);

  const [answerTo, setAnswerTo] = useState({
    author: '',
    id: '',
  });

  const { addComment, commentText, setCommentText, comments, Answer, loading } =
    useComments({ setAnswerTo });

  const navigation = useNavigation();
  const currentUser = getAuth().currentUser;
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  const handleAddComment = async (text: string) => {
    await addComment(text);
    scrollToItem(0);

    if (answerTo.author !== '') {
      setAnswerTo({ author: '', id: '' });
    }
  };

  const scrollToItem = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const renderItem = useCallback(
    ({ item }: ItemProp) => (
      <Comment comment={item} setAnswerTo={setAnswerTo} />
    ),
    [setAnswerTo]
  );

  const handleAnswerComment = async (text: string) => {
    await Answer(text, answerTo);
    setOpen(true);
  };

  const placeholder =
    answerTo.author !== ''
      ? `Type your answer to ${answerTo.author}`
      : 'Type Comment...';

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header />,
    });
  }, []);

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme === 'dark' ? colors.dark : colors.white },
      ]}
    >
      <View style={styles.commentContainer}>
        {loading && <CLoader />}
        <FlatList
          ref={flatListRef}
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
        style={[
          styles.commentForm,
          { backgroundColor: theme === 'dark' ? colors.black : colors.white },
        ]}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={inputRef}
              style={[
                styles.commentInput,
                {
                  backgroundColor:
                    theme === 'dark' ? colors.dark : colors.white,
                },
              ]}
              multiline
              placeholder={placeholder}
              placeholderTextColor={
                placeholder === 'Type Comment...' ? colors.grey : colors.blue
              }
              value={commentText}
              onChangeText={setCommentText}
              onEndEditing={({ nativeEvent }) =>
                setCommentText(nativeEvent.text)
              }
            />

            {placeholder === 'Type Comment...' ? (
              <Pressable onPress={() => handleAddComment(commentText)}>
                <MaterialCommunityIcons
                  name='send-circle'
                  size={45}
                  color={colors.blue}
                />
              </Pressable>
            ) : (
              <Pressable onPress={() => handleAnswerComment(commentText)}>
                <MaterialCommunityIcons
                  name='send-circle'
                  size={45}
                  color={colors.blue}
                />
              </Pressable>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;
