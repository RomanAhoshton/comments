import { DB } from "../firebase";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { TodoType } from "../types";
import { Alert } from "react-native";

import { useState } from "react";

interface TodoData {
  todo: TodoType[];
}

export const useAddTodo = () => {
  const [todoText, setTodoText] = useState("");
  const auth = getAuth();
  const currentUserId = auth?.currentUser?.uid;
  const uuid = uuidv4();

  const addTodo = async () => {
    try {
      if (!currentUserId) {
        Alert.alert("", "User  not available");
        throw new Error("User is not available");
      }

      if (todoText.trim() === "") {
        Alert.alert("", "The field is empty");
        throw new Error("The field is empty");
      }

      const todoRef = doc(DB, "todo", currentUserId!);
      const todoData: TodoData = { todo: [] };

      const todoDocSnapshot = await getDoc(todoRef);
      if (todoDocSnapshot.exists()) {
        todoData.todo = todoDocSnapshot.data().todo;
      }

      todoData.todo.push({ text: todoText, id: uuid });
      setTodoText("");

      await setDoc(todoRef, todoData);
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  return { addTodo, todoText, setTodoText };
};
