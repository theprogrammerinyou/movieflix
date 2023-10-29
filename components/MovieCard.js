import { image500 } from "../api/moviedb";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const { width, height } = Dimensions.get("window");

export const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={styles.imageStyle}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: width * 0.45,
    height: height * 0.4,
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 0,
    margin: 10,
    padding: 10,
    borderColor: "#808080",
  },
});
