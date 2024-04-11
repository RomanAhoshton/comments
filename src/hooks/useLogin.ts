import { useState } from "react";
import { userFormValue } from "../types";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ScreenNames } from "../helpers";

export const useLogin = () => {
  const [userValue, setUserValue] = useState<userFormValue>({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const navigation = useNavigation();

  const Login = async () => {
    setIsLoading(true);

    try {
      if (userValue.email.trim() === "") {
        Alert.alert("", "Please enter the email");
        throw new Error("Please enter the email");
      }
      if (userValue.password.trim() === "") {
        Alert.alert("", "Please enter the password");
        throw new Error("Please enter the password");
      }

      const result = await signInWithEmailAndPassword(
        auth,
        userValue.email,
        userValue.password
      );

      const user = result.user;

      if (user.uid) {
        setIsLoading(false);
        setUserValue({
          email: "",
          password: "",
        });

        navigation.navigate(ScreenNames.TodoScreen as never);
      }
    } catch (error) {
      if (error) {
        setIsLoading(false);
        alert(error);
      }
    }
  };
  return {
    userValue,
    Login,
    setUserValue,
    isLoading,
  };
};
