import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Set the background color of the container
    
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
    padding: 10, // Increase the padding for more white space around the button
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
    borderWidth:1,
    borderColor: "#eee",
    width:330,
    height: 40,
  },
  text: {
    textAlign: "center",
  },
});


export default styles;
