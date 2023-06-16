import { StyleSheet } from "react-native";


const stylesHome = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: "#ccc",
      marginRight: 8,
      paddingHorizontal: 8,
    },
    searchButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    searchButtonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    todayButton: {
      backgroundColor: "#2196F3",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 4,
      marginBottom: 8,
    },
    todayButtonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    tomorrowButton: {
      backgroundColor: "#9C27B0",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 4,
    },
    tomorrowButtonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  
  export {stylesHome };