import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { styles } from "./style";
import { ScreenNames } from "../../helpers";
import { useLogin } from "../../hooks/useLogin";
import { colors } from "../../helpers";
import Form from "../../components/Form";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { userValue, setUserValue, Login, isLoading } = useLogin();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}> TODO APP</Text>
        <Text style={styles.loginText}> Login</Text>
        {isLoading && <ActivityIndicator size="large" color={colors.blue} />}

        <Form
          userValue={userValue}
          setUserValue={setUserValue}
          userAction={Login}
          textButton="Login"
        />

        <Pressable
          style={styles.toLogin}
          onPress={() =>
            navigation.navigate(ScreenNames.RegisterScreen as never)
          }
        >
          <Text style={styles.text}> Back to Create Account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
