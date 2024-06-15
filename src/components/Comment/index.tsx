import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Comment } from '../../types';
import { Metrics, colors } from '../../helpers';
import Avatar from '../Avatar';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  const formattedDateTime = (timestamp: any) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Invalid Date';
    }

    const secondsInMillis = timestamp.seconds * 1000;
    const nanosecondsInMillis = timestamp.nanoseconds / 1e6;
    const totalMilliseconds = secondsInMillis + nanosecondsInMillis;

    const dateObject = new Date(totalMilliseconds);

    const day = dateObject.getDate().toString().padStart(2, '0');
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  };

  return (
    <View style={styles.commentContainer}>
      <View style={styles.author}>
        {comment.avatar ? (
          <Image
            style={styles.avatar}
            source={{
              uri: comment.avatar,
            }}
          />
        ) : (
          <View style={[styles.noImageAvatar]}>
            <Text style={styles.textLogo}>{comment.author?.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{comment.author}</Text>
          <Text style={styles.timestamp}>
            {formattedDateTime(comment.timestamp)}
          </Text>
        </View>
      </View>
      <View style={styles.textAnswer}>
        <Text style={styles.textMessage}>{comment.text}</Text>
        <Pressable>
          <Text style={styles.answer}>Answer</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: colors.black,
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
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.blue,
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
});

export default CommentComponent;
