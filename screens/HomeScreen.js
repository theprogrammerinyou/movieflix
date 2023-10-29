import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import Movies from "../components/Movies";
import { StatusBar } from "expo-status-bar";
import { fetchMoviesList } from "../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [moviesList, setMoviesList] = useState([]);
  const [year, setYear] = useState(2012);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    getMoviesList({ years: year, prevYear: false });
  }, []);

  const getMoviesList = async ({ years = 2012, prevYear }) => {
    try {
      const data = await fetchMoviesList(years);
      if (data?.results && prevYear)
        setMoviesList([...data.results, ...moviesList]);
      if (data?.results && !prevYear)
        setMoviesList([...moviesList, ...data.results]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getNextYearsMovies = () => {
    setYear((prevYear) => prevYear + 1);
    getMoviesList({ years: year + 1, prevYear: false });
  };

  const getPreviousYearsMovies = (event) => {
    if (event.nativeEvent.contentOffset.y <= 0) {
      setYear((prevYear) => prevYear - 1);
      getMoviesList({ years: year - 1, prevYear: true });
    }
  };

  return (
    <View style={styles.container}>
      {/* search bar */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="auto" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: 20,
          }}
        >
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="black" />
          <Text style={styles.textStyles}>Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Movies List */}
          {moviesList.length > 0 && (
            <Movies
              data={moviesList}
              getPreviousYearsMovies={getPreviousYearsMovies}
              year={year}
              getNextYearsMovies={getNextYearsMovies}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#BFD9D6",
    flex: 1,
  },
  textStyles: {
    color: "#242424",
    fontSize: 30,
    fontWeight: "bold",
  },
});
