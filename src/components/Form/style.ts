import { StyleSheet } from "react-native";
import { colors } from "../../helpers";

export const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 0.5,
    padding: 10,
    borderColor: colors.grey,
    borderRadius: 10,
    color: colors.white,
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.blue,
    margin: 12,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  textB: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
  },
});
