import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

const { width, height} = Dimensions.get("window");
export default function TrendingMovies({ data, getPreviousYearsMovies, getNextYearsMovies }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
      onEndReached={getNextYearsMovies}
      onScroll={getPreviousYearsMovies}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<ActivityIndicator size="large" />}
    />
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
    width: width * 0.45,
    height: height * 0.4,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 0,
    margin: 10,
    padding: 10,
    borderColor: '#808080',
  },
});
