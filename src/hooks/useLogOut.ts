import { ScreenNames } from "../helpers";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";

export const useLogOut = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const LogOut = () => {
    auth.signOut();
    navigation.navigate(ScreenNames.RegisterScreen as never);
  };

  return { LogOut };
};
