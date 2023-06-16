import { StyleSheet } from "react-native";

const gigCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  artistText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  venueText: {
    fontSize: 14,
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
  },
});

export default gigCardStyles;