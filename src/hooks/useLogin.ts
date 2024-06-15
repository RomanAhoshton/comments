import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ScreenNames } from '../helpers';
import { FormData } from '../types';

interface Props {
  reset: () => void;
}

export const useLogin = ({ reset }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const navigation = useNavigation();

  const Login = async (data: FormData) => {
    setIsLoading(true);

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = result.user;

      if (user.uid) {
        setIsLoading(false);
        reset();
        navigation.navigate(ScreenNames.CommentsScreen as never);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        alert(error);
        reset();
      }
    }
  };
  return {
    Login,
    isLoading,
  };
};
