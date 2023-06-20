import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  buttonContainer: {
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    marginTop: 5,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#eee",
    width: 330,
    height: 40,
  },
  text: {
    textAlign: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default styles;
