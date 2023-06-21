import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Set the background color of the container
    paddingHorizontal: 20,
    paddingTop: 20,
    
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  artistName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  artistImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  songPreview: {
    width: 300,
    height: 40,
    marginBottom: 10,
  },
  songPreviewText: {
    marginBottom: 10,
  },
  addToFavoritesButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addToFavoritesButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artistBio: {
    marginBottom: 20,
  },
  image: {
    width: 200, 
    height: 200,
    marginTop: 10,
    resizeMode: "cover",
  },
  
});


export default styles;
