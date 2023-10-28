import {
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View style={style.container}>
      <Text style={style.trendingTextStyle}>Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        layout={"default"}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={style.imageStyle}
      />
    </TouchableWithoutFeedback>
  );
};

const style = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  trendingTextStyle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#29425A",
    marginLeft: 20,
    marginBottom: 10,
  },
  imageStyle: {
    width: width * 0.6,
    height: height * 0.4,
    borderRadius: 30,
  },
});
