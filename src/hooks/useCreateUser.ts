import { useState } from "react";
import { Alert } from "react-native";
import { userFormValue } from "../types";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ScreenNames } from "../helpers";
import { useNavigation } from "@react-navigation/native";

export const useCreateUser = () => {
  const navigation = useNavigation();
  const [userValue, setUserValue] = useState<userFormValue>({
    email: "",
    password: "",
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const createUser = async () => {
    setIsLoading(true);

    try {
      if (userValue?.name?.trim() === "") {
        Alert.alert("", "Please enter the name");
        throw new Error("Please enter the name");
      }
      if (userValue.email.trim() === "") {
        Alert.alert("", "Please enter the email");
        throw new Error("Please enter the email");
      }
      if (userValue.password.trim() === "") {
        Alert.alert("", "Please enter the password");
        throw new Error("Please enter the password");
      }
      const result = await createUserWithEmailAndPassword(
        auth,
        userValue.email,
        userValue.password
      );
      const user = result.user;
      if (user) {
        await updateProfile(user, {
          displayName: userValue.name,
        });

        if (user) {
          Alert.alert("", "Your account has been created. Go to Login?", [
            {
              text: "Yes",
              onPress: () =>
                navigation.navigate(ScreenNames.LoginScreen as never),
              style: "cancel",
            },
            { text: "No", onPress: () => null },
          ]);
          setUserValue({ email: "", password: "", name: "" });
          setIsLoading(false);
        }
      }
    } catch (error) {
      const err = error as any;
      Alert.alert("", err.code);
      setIsLoading(false);
    }
  };

  return { userValue, setUserValue, createUser, isLoading };
};
