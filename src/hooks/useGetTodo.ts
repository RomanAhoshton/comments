import { useEffect, useState } from "react";
import { TodoType } from "../types";
import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "@firebase/firestore";
import { DB } from "../firebase";

interface TodoData {
  todo: TodoType[];
}

export const useGetTodo = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const auth = getAuth();
  const currentUserId = auth?.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = currentUserId ? listenToTodo() : () => {};

    return unsubscribe;
  }, [currentUserId]);

  const listenToTodo = () => {
    const todoRef = doc(DB, "todo", currentUserId!);
    return onSnapshot(todoRef, (doc) => {
      if (doc.exists()) {
        const todoData = doc.data() as TodoData;

        setTodo(todoData.todo);
      } else {
        setTodo([]);
      }
    });
  };

  return { todo, listenToTodo, setTodo };
};
