import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import {
  collection,
  setDoc,
  doc,
  getDoc,
  Timestamp,
  addDoc,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { Comment } from '../types';
import { getAuth, updateProfile } from 'firebase/auth';
import { set, get, ref } from 'firebase/database';
import { storage, DB } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export const useComments = () => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const commentsCollection = collection(DB, 'comments');
  const currentUser = getAuth().currentUser;

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const q = query(commentsCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      let fetchedComments: Comment[] = [];
      querySnapshot.forEach((doc: any) => {
        fetchedComments.push(doc.data());
      });
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async (text: string) => {
    try {
      if (text !== '') {
        const commentData = {
          text: text,
          author: currentUser?.displayName,
          avatar: currentUser?.photoURL,
          timestamp: Timestamp.now(),
          id: uuidv4(),
          responses: [],
        };

        await addDoc(commentsCollection, commentData);
        setCommentText('');
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { addComment, setCommentText, commentText, comments };
};
