import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../helpers";
import { TodoType } from "../../types";

interface TodoProps {
  item: TodoType;
  index: number;
}

export default ({ item, index }: TodoProps) => {
  return (
    <View style={styles.todoItem}>
      <Text style={styles.number}>{`${index + 1})`}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    borderWidth: 2,
    borderColor: colors.blue,
    marginBottom: 15,
    color: colors.blue,
    borderRadius: 20,
    flexDirection: "row",
    padding: 10,
    height: "auto",
    alignItems: "center",
  },
  number: {
    color: colors.blue,
    marginRight: 10,
    fontSize: 16,
  },
  text: {
    color: colors.blue,
    fontSize: 16,
  },
});
