import React, { useState, memo, useCallback } from 'react';
import { View, Text, Image, Pressable, FlatList } from 'react-native';
import { Comment, responses } from '../../types';
import { colors } from '../../helpers';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useFormattedDate } from '../../hooks/useFormattedDate';
import AnswerComment from '../AnswerComment';
import { useTheme } from '../../hooks/useTheme';

interface CommentProps {
  comment: Comment;
  setAnswerTo: (arg: any) => void;
}

interface ItemProp {
  item: responses;
}

export default memo(({ comment, setAnswerTo }: CommentProps) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);

  const handleAnswer = (comment: Comment) => {
    setAnswerTo({ author: comment.author, id: comment.id });
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const { formattedDateTime } = useFormattedDate();

  const renderItem = useCallback(
    ({ item }: ItemProp) => <AnswerComment answer={item} />,
    [setAnswerTo]
  );

  return (
    <View
      style={[
        styles.commentContainer,
        { backgroundColor: theme === 'dark' ? colors.dark : colors.white },
      ]}
    >
      <View style={styles.author}>
        {comment.avatar ? (
          <Image
            style={styles.avatar}
            source={{
              uri: comment.avatar,
            }}
          />
        ) : (
          <View
            style={[
              styles.noImageAvatar,
              {
                backgroundColor: theme === 'dark' ? colors.dark : colors.white,
              },
            ]}
          >
            <Text style={styles.textLogo}>{comment.author?.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{comment.author}</Text>
          <Text style={styles.timestamp}>
            {formattedDateTime(comment.timestamp)}
          </Text>
        </View>
        {comment.responses.length > 0 && (
          <Pressable style={styles.arrow} onPress={() => handleOpen()}>
            <MaterialIcons
              name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={40}
              color={colors.blue}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.textAnswer}>
        {comment.text && <Text style={styles.textMessage}>{comment.text}</Text>}
        {comment.image && (
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: comment?.image,
            }}
          ></Image>
        )}

        <Pressable onPress={() => handleAnswer(comment)}>
          <Text style={styles.answer}>Answer</Text>
        </Pressable>
      </View>

      {comment.responses.length > 0 && !open ? (
        <FlatList
          data={comment.responses}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : null}
    </View>
  );
});
