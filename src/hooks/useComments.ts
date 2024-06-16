import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  Timestamp,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { Comment } from '../types';
import { getAuth } from 'firebase/auth';
import { DB } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

interface answerTo {
  author: string;
  id: string;
}

interface AnswerToProps {
  setAnswerTo: (arg: answerTo) => void;
}

export const useComments = ({ setAnswerTo }: AnswerToProps) => {
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const commentsCollection = collection(DB, 'comments');

  const currentUser = getAuth().currentUser;

  useEffect(() => {
    const q = query(commentsCollection, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let fetchedComments: Comment[] = [];
      querySnapshot.forEach((doc: any) => {
        fetchedComments.push(doc.data());
      });
      setComments(fetchedComments);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Answer = async (text: string, answerTo: answerTo) => {
    if (text !== '' && answerTo.id !== '') {
      const answerData = {
        text: text,
        author: currentUser?.displayName,
        avatar: currentUser?.photoURL,
        timestamp: Timestamp.now(),
        id: uuidv4(),
      };

      try {
        const q = query(commentsCollection, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        for (const docSnapshot of querySnapshot.docs) {
          const docData = docSnapshot.data();
          if (docData.id === answerTo.id) {
            const updatedResponses = [...docData.responses, answerData];
            await updateDoc(doc(commentsCollection, docSnapshot.id), {
              responses: updatedResponses,
            });
            break;
          }
        }
        setCommentText('');
        setAnswerTo({ author: '', id: '' });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    addComment,
    setCommentText,
    commentText,
    comments,
    Answer,
    loading,
  };
};
