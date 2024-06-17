import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { DB, storage } from '../firebase';

export const useAvatar = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = getAuth().currentUser;

  const avatarsCollection = collection(DB, 'avatars');

  useEffect(() => {
    fetchAvatar();
  }, []);

  const fetchAvatar = async () => {
    setLoading(true);
    if (currentUser) {
      const docRef = doc(avatarsCollection, currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const url = docSnap.data().url;
        setImage(url);
        setLoading(false);
      } else {
        console.log('No such document!');
      }
    }
  };

  const pickImage = async () => {
    setLoading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      await uploadAvatar(result.assets[0].uri);
    }
  };

  const uploadAvatar = async (fileImage: string) => {
    try {
      const result = await ImageManipulator.manipulateAsync(fileImage, [], {
        compress: 0.5,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      if (currentUser && result.uri) {
        const response = await fetch(result.uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `avatars/${currentUser.uid}`);
        const uploadResult = await uploadBytes(storageRef, blob);

        if (uploadResult) {
          const downloadURL = await getDownloadURL(storageRef);

          await updateProfile(currentUser, { photoURL: downloadURL });

          await setDoc(doc(avatarsCollection, currentUser.uid), {
            url: downloadURL,
          });
          setImage(downloadURL);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return { pickImage, image, loading };
};
