import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
    container: {
        
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: "flex-left",
    
  },
  buttonContainer: {
    
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    
  },
  button: {
    
    backgroundColor: "black",
    width: "20%",
    padding: 10, // Increase the padding for more white space around the button
    borderRadius: 10,
    marginTop: 10,
    color: "white",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
  },
  
  text: {
    textAlign: "center",
  },
});


export default styles;
