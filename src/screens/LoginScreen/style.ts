import { StyleSheet } from "react-native";
import { colors } from "../../helpers";
import Mertics from "../../helpers";

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.dark,
    flex: 1,
    width: Mertics.width,
    alignSelf: "center",
    paddingTop: 200,
  },

  container: {
    padding: 20,
  },

  loginText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },

  title: {
    color: colors.white,
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 100,
    textTransform: "uppercase",
  },
  text: { color: colors.white, fontSize: 22, fontWeight: "700" },
  toLogin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});
