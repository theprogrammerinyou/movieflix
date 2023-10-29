import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { searchMovies } from "../api/moviedb";
import { debounce } from "lodash";
import { theme } from "../theme";
import Loading from "../components/Loading";
import { MovieCard } from "../components/MovieCard";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      try {
        setLoading(true);
        const searchMovieResults = await searchMovies({
          query: search,
          include_adult: false,
          language: "en-US",
          page: "1",
        });
        if (searchMovieResults?.results) {
          setLoading(false);
          setResults(searchMovieResults?.results);
        }
      } catch (error) {
        setLoading(false);
        setResults([]);
      }
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleMoviePosterClick = (item) => {
    navigation.navigate("Movie", item);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* search input */}
      <View style={styles.searchInputContainer}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor="black"
          autoFocus={true}
          autoComplete="off"
          style={styles.searchInput}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.closeButton}
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <MovieCard handleClick={handleMoviePosterClick} item={item} />
          )}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<ActivityIndicator size="large" />}
        />
      ) : (
        <View style={styles.resultContainer}>
          <Image
            source={require("../assets/images/movieTime.png")}
            style={styles.loadingImage}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.background,
  },
  searchInputContainer: {
    margin: 16,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(115 115 115)",
    borderRadius: 20,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    letterSpacing: 1.5,
  },
  closeButton: {
    borderRadius: 50,
    padding: 12,
    margin: 4,
    backgroundColor: "rgb(115 115 115)",
  },
  resultsText: {
    color: "black",
    fontWeight: "bold",
    marginLeft: 5,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  resultContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  resultImage: {
    width: 200,
    height: 300,
    borderRadius: 20,
  },
  resultText: {
    color: "black",
    marginLeft: 5,
  },
  loadingImage: {
    height: 96,
    width: 96,
  },
});
