import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useCreateUser } from "../../hooks/useCreateUser";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";
import { colors } from "../../helpers";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { ScreenNames } from "../../helpers";

const RegisterScreen = () => {
  const { createUser, userValue, setUserValue, isLoading } = useCreateUser();

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}> WELCOME TO TODO APP</Text>
        <Text style={styles.createText}>Create Account</Text>

        {isLoading && <ActivityIndicator size="large" color={colors.blue} />}
        <Form
          userValue={userValue}
          setUserValue={setUserValue}
          userAction={createUser}
          textButton="Create Account"
        />

        <Pressable
          style={styles.toLogin}
          onPress={() => navigation.navigate(ScreenNames.LoginScreen as never)}
        >
          <Text style={styles.text}> Already have account ? Log in</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
