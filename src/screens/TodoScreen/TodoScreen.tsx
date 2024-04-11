import {
  Pressable,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useLogOut } from "../../hooks/useLogOut";
import { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../helpers";
import { getAuth } from "firebase/auth";
import { styles } from "./styles";
import { useGetTodo } from "../../hooks/useGetTodo";
import TodoTask from "../../components/TodoTask";
import { useAddTodo } from "../../hooks/useAddTodo";

const TodoScreen = () => {
  const { LogOut } = useLogOut();
  const navigation = useNavigation();
  const currentUser = getAuth().currentUser;
  const { todo } = useGetTodo();
  const { addTodo, todoText, setTodoText } = useAddTodo();
  const flatListRef = useRef<FlatList>(null);

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [todo]);

  const handleChangeText = (text: string) => {
    setTodoText(text);
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.black,
        padding: 10,
      },
      headerTitleStyle: {
        color: colors.blue,
        fontSize: 20,
        fontWeight: "600",
      },
      headerBackTitleStyle: {
        color: colors.blue,
      },
      headerTintColor: colors.blue,
      headerTitleAlign: "center",

      headerTitle: () => {
        return (
          <Pressable
            onPress={LogOut}
            style={{
              borderWidth: 2,
              padding: 5,
              borderColor: colors.blue,
              borderRadius: 15,
              marginBottom: 10,
              marginLeft: 20,
            }}
          >
            <Text style={styles.logOutBtn}>Log out</Text>
          </Pressable>
        );
      },

      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => {
        return <Text style={styles.name}>{currentUser?.displayName}</Text>;
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.todoContainer}>
        <FlatList
          ref={flatListRef}
          data={todo}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TodoTask item={item} index={index} />
          )}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.todoForm}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.todoInput]}
              multiline
              placeholder="Add Task..."
              placeholderTextColor={colors.white}
              value={todoText}
              onChangeText={handleChangeText}
              onEndEditing={({ nativeEvent }) =>
                handleChangeText(nativeEvent.text)
              }
            />
            <Pressable onPress={addTodo}>
              <Text style={styles.addTodoBtn}>ADD TASK</Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TodoScreen;
