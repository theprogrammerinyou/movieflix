import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    setLoading(false);
    if (data) {
      setPerson(data);
    }
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#C2DBD8", flex: 1 }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          style={{ background: "#C2DBD8", borderRadius: 40, padding: 10 }}
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            style={{
              shadowColor: "gray",
              flexDirection: "row",
              justifyContent: "center",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                borderRadius: 150,
                overflow: "hidden",
                height: 300,
                width: 300,
                borderWidth: 2,
                borderColor: "rgb(63, 63, 63)",
              }}
            >
              <Image
                // source={require('../assets/images/castImage2.png')}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>

          <View style={{ marginTop: 6 }}>
            <Text
              style={{
                fontSize: 30,
                color: "black",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {/* Keanu Reeves */}
              {person?.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 20,
                color: "black",
                textAlign: "center",
              }}
            >
              {person?.place_of_birth}
              {/* Beirut, Lebanon */}
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 20,
              padding: 10,
              marginTop: 6,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#4A5568",
              borderRadius: 9999,
            }}
          >
            <View
              style={{
                borderRight: 2,
                paddingHorizontal: 2,
                alignItems: "center",
                borderColor: "rgb(115 115 115)",
              }}
            >
              <Text style={{ color: "rgb(245 245 245)", fontWeight: 600 }}>
                Gender
              </Text>
              <Text
                style={{
                  color: "rgb(245 245 245)",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {/* Male */}
                {person?.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View
              style={{
                borderRight: 2,
                paddingHorizontal: 2,
                alignItems: "center",
                borderColor: "rgb(115 115 115)",
              }}
            >
              <Text style={{ color: "rgb(245 245 245)", fontWeight: 600 }}>
                Birthday
              </Text>
              <Text
                style={{
                  color: "rgb(245 245 245)",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {/* 1964-09-02 */}
                {person?.birthday}
              </Text>
            </View>
            <View
              style={{
                borderRight: 2,
                paddingHorizontal: 2,
                alignItems: "center",
                borderColor: "rgb(115 115 115)",
              }}
            >
              <Text style={{ color: "rgb(245 245 245)", fontWeight: 600 }}>
                Known for
              </Text>
              <Text
                style={{
                  color: "rgb(245 245 245)",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {/* Acting */}
                {person?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text style={{ color: "rgb(245 245 245)", fontWeight: 600 }}>
                Popularity
              </Text>
              <Text
                style={{
                  color: "rgb(245 245 245)",
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {/* 84.23 % */}
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 6, marginHorizontal: 4, marginLeft: 10 }}>
            {/* person movies */}
            {person?.id && personMovies.length > 0 && (
              <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
            )}
          </View>

          <View style={{ marginTop: 6, marginHorizontal: 4, marginLeft: 10 }}>
            <Text
              style={{
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Biography
            </Text>
            <Text style={{ letterSpacing: 1 }}>
              {person?.biography ? person.biography : "N/A"}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
