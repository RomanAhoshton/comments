import { Dimensions } from "react-native";

export const colors = {
  black: "#0e1012",
  blue: "#1daeff",
  white: "#fff",
  dark: "#282828",
  grey: "#8f90a6",
};

const { width, height } = Dimensions.get("window");

const Mertics = {
  width,
  height,
};

export enum ScreenNames {
  RegisterScreen = "RegisterScreen",
  LoginScreen = "LoginScreen",
  TodoScreen = "TodoScreen",
}

export default Mertics;
