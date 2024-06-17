import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { collection, Timestamp, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { DB, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import * as ImageManipulator from 'expo-image-manipulator';

export const useShareImage = () => {
  const [loadingImage, setLoadingImage] = useState(false);
  const commentsCollection = collection(DB, 'comments');
  const currentUser = getAuth().currentUser;

  const pickImage = async () => {
    setLoadingImage(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await shareImage(result.assets[0].uri);
    }
    setLoadingImage(false);
  };

  const shareImage = async (imageUri: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(imageUri, [], {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      if (currentUser && result.uri) {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        const imageId = uuidv4();
        const storageRef = ref(storage, `comments/${imageId}`);

        const uploadResult = await uploadBytes(storageRef, blob);

        if (uploadResult) {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('Download URL:', downloadURL);

          await addImageToFirestore(downloadURL);
        }
      }
    } catch (error) {
      console.error('Error sharring image:', error);
    }
  };

  const addImageToFirestore = async (imageUrl: string) => {
    try {
      const commentData = {
        image: imageUrl,
        author: currentUser?.displayName,
        avatar: currentUser?.photoURL,
        timestamp: Timestamp.now(),
        id: uuidv4(),
        responses: [],
      };

      await addDoc(commentsCollection, commentData);
    } catch (error) {
      setLoadingImage(false);
      console.log('Error adding image to Firestore:', error);
    }
  };

  return { pickImage, loadingImage };
};
