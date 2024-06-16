import { FormData } from '../types';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useLogin } from './useLogin';

interface Props {
  reset: () => void;
}

export const useCreateUser = ({ reset }: Props) => {
  const { Login } = useLogin({ reset });

  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const createUser = async (data: FormData) => {
    setIsLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = response.user;
      if (user) {
        await updateProfile(user, {
          displayName: data.name,
        });
        Alert.alert(
          '',
          'Your account has been created. Do you want to Login?',
          [
            {
              text: 'Yes',
              onPress: () => Login(data),
              style: 'cancel',
            },
            { text: 'No', onPress: () => null },
          ]
        );
        setIsLoading(false);
        reset();
      }
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return { createUser, isLoading };
};
