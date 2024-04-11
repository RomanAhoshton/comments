import { StyleSheet } from "react-native";
import { colors } from "../../helpers";
import Mertics from "../../helpers";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.dark,
    flex: 1,
    width: Mertics.width,
  },

  container: {
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
  },

  title: {
    color: colors.white,
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 100,
    textTransform: "uppercase",
  },
  text: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  toLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },

  createText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },
});
