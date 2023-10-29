import { FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { MovieCard } from "./MovieCard";

export default function Movies({
  data,
  getPreviousYearsMovies,
  getNextYearsMovies, scrollOffset
}) {
  const navigation = useNavigation();
  const flatListRef = useRef();

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  useEffect(() => {
    if (scrollOffset > 0 && data.length) {
      flatListRef.current.scrollToOffset({
        offset: scrollOffset.current,
        animated: false,
      });
    }
  }, [data]);

  return (
    <FlatList
      data={data}
      ref={flatListRef}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <MovieCard handleClick={handleClick} item={item} />
      )}
      onEndReached={getNextYearsMovies}
      onScroll={getPreviousYearsMovies}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<ActivityIndicator size="large" />}
    />
  );
}
