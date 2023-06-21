import { StyleSheet } from "react-native";

const stylesHome = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    marginTop: 50,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  todayButton: {
    backgroundColor: "black",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  todayButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  tomorrowButton: {
    backgroundColor: "black",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  tomorrowButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export { stylesHome };