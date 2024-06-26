import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth } from 'firebase/auth';
import CommentsScreen from '../../screens/CommentsScreen/CommentsScreen';
import RegisterScreen from '../../screens/RegisterScreen/RegisterScreen';
import LoginScreen from '../../screens/LoginScreen/LoginScreen';
import { ScreenNames } from '../../helpers';

export default () => {
  const Stack = createNativeStackNavigator();

  const currentUser = getAuth().currentUser;

  return (
    <Stack.Navigator
      initialRouteName={
        currentUser ? ScreenNames.CommentsScreen : ScreenNames.RegisterScreen
      }
    >
      <Stack.Screen
        name={ScreenNames.RegisterScreen}
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ScreenNames.LoginScreen}
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ScreenNames.CommentsScreen}
        component={CommentsScreen}
      />
    </Stack.Navigator>
  );
};
