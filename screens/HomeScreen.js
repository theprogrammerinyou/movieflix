import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import DropDownPicker from "react-native-dropdown-picker";
import Movies from "../components/Movies";
import { fetchMoviesList, fetchGenres } from "../api/moviedb";
import Loading from "../components/Loading";

const ios = Platform.OS === "ios";

export default function HomeScreen() {
  const [moviesList, setMoviesList] = useState([]);
  const [year, setYear] = useState(2012);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const scrollOffset = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    getMoviesList({ years: year, prevYear: false });
    getGenres();
  }, []);

  useEffect(() => {
    if (value) {
      getMoviesList({ genre: value, prevYear: false });
    }
  }, [value]);

  const getGenres = async () => {
    try {
      const genresList = await fetchGenres();
      setGenres(
        genresList.genres.map((genre) => ({
          label: genre.name,
          value: genre.id,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error getting genres: " + error);
      setLoading(false);
    }
  };

  const getMoviesList = async ({ genre, years = 2012, prevYear }) => {
    try {
      const data = await fetchMoviesList({ genre, years });
      if (data?.results) {
        // Set the updated movies list
        if (value) setMoviesList(data.results);
        else
          setMoviesList(
            prevYear
              ? [...data.results, ...moviesList]
              : [...moviesList, ...data.results]
          );
      }
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
    const offsetY = event.nativeEvent.contentOffset.y;
    // scrollOffset.current = offsetY;
    if (offsetY <= 0) {
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
          {/* Clear Filter Button */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              zIndex: 1,
              marginLeft: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setValue(null);
                getMoviesList({ years: year, prevYear: false });
              }}
            >
              <XCircleIcon size="30" strokeWidth={2} color="black" />
            </TouchableOpacity>
            <DropDownPicker
              open={open}
              style={{
                width: 150,
                borderRadius: 22,
                marginLeft: 15,
              }}
              value={value}
              items={genres}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setGenres}
              placeholder="Genres"
              showArrowIcon={true}
              theme="DARK"
              dropDownContainerStyle={{
                width: 150,
                borderRadius: 22,
                marginLeft: 15,
              }}
              closeOnBackPressed={true}
              placeholderStyle={{
                color: "grey",
                fontWeight: "bold",
              }}
            />
          </View>
          {/* Movies List */}
          {moviesList.length > 0 && (
            <Movies
              data={moviesList}
              getPreviousYearsMovies={getPreviousYearsMovies}
              year={year}
              scrollOffset={scrollOffset}
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
