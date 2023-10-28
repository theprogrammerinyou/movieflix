import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";
const { width, height } = Dimensions.get("window");

export default function MovieList({ title, hideSeeAll, data }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text>See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.push("Movie", item)}
          >
            <View style={styles.movieContainer}>
              <Image
                source={{
                  uri: image185(item.poster_path) || fallbackMoviePoster,
                }}
                style={[
                  styles.movieImage,
                  { width: width * 0.33, height: height * 0.22 },
                ]}
              />
              <Text style={styles.movieTitle}>
                {item.title.length > 14
                  ? item.title.slice(0, 14) + "..."
                  : item.title}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#29425A",
    marginLeft: 10,
    marginBottom: 10,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  movieContainer: {
    marginRight: 16,
  },
  movieImage: {
    borderRadius: 16,
  },
  movieTitle: {
    color: "#29425A",
    marginLeft: 4,
    fontSize: 15
  },
});
