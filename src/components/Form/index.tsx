import { TextInput, Pressable, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { userFormValue } from "../../types";
import { styles } from "./style";
import { ScreenNames } from "../../helpers";
import { colors } from "../../helpers";

interface Props {
  userValue: userFormValue;
  setUserValue: (arg: userFormValue) => void;
  userAction: () => void;
  textButton: string;
}

export default ({ userValue, setUserValue, userAction, textButton }: Props) => {
  const route = useRoute();

  return (
    <>
      {route.name === ScreenNames.RegisterScreen && (
        <TextInput
          style={[styles.input, { marginTop: 30 }]}
          onChangeText={(text) =>
            setUserValue({
              password: userValue.password,
              email: userValue.email,
              name: text,
            })
          }
          value={userValue.name}
          placeholder="Name"
          placeholderTextColor={colors.white}
        />
      )}

      <TextInput
        style={[
          styles.input,
          // eslint-disable-next-line react-native/no-inline-styles
          { marginTop: route.name === ScreenNames.RegisterScreen ? 12 : 50 },
        ]}
        onChangeText={(text) =>
          setUserValue({
            password: userValue.password,
            name: userValue.name,
            email: text,
          })
        }
        value={userValue.email}
        placeholder="Email"
        placeholderTextColor={colors.white}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setUserValue({
            email: userValue.email,
            password: text,
            name: userValue.name,
          })
        }
        value={userValue.password}
        placeholder="Password"
        placeholderTextColor={colors.white}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={userAction}>
        <Text style={styles.textB}>{textButton}</Text>
      </Pressable>
    </>
  );
};
