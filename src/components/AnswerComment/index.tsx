import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { responses } from '../../types';
import { useFormattedDate } from '../../hooks/useFormattedDate';
import { useTheme } from '../../hooks/useTheme';
import { colors } from '../../helpers';

interface ResponseProps {
  answer: responses;
}

export default memo(({ answer }: ResponseProps) => {
  const { formattedDateTime } = useFormattedDate();
  const { theme } = useTheme();

  return (
    <View style={styles.commentContainer}>
      <View style={styles.author}>
        {answer.avatar ? (
          <Image
            style={styles.avatar}
            source={{
              uri: answer.avatar,
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
            <Text style={styles.textLogo}>{answer.author?.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{answer.author}</Text>
          <Text style={styles.timestamp}>
            {formattedDateTime(answer.timestamp)}
          </Text>
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.textMessage}>{answer.text}</Text>
      </View>
    </View>
  );
});
