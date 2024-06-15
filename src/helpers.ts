import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Metrics = {
  width,
  height,
};

export enum ScreenNames {
  RegisterScreen = 'RegisterScreen',
  LoginScreen = 'LoginScreen',
  CommentsScreen = 'CommentsScreen',
}

export const colors = {
  black: '#0e1012',
  blue: '#1daeff',
  white: '#fff',
  dark: '#282828',
  grey: '#8f90a6',
  red: '#FD0E42',
};

export const fontSizes = {
  large: 36,
  medium: 20,
  small: 16,
};

export const space = {
  small: 10,
  medium: 15,
  large: 20,
};
