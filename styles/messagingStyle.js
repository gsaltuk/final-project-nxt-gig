import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  messages: {
    
    paddingHorizontal: 15,
    paddingVertical: 10,
    
    marginTop: 5,
    borderRadius: 7,
    borderWidth:1,
    borderColor: "gray",

  },
  messagesText:{
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 7,
    borderWidth:1,
    borderColor: "black",
  },
  buttonContainer: {
    flex:1,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "black",
    width: "50%",
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
    width:385,
    height: 100,
  },
});


export default styles;
