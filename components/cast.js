import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { fallbackPersonImage, image185 } from "../api/moviedb";

export default function Cast({ cast, navigation }) {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Top Cast</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {cast &&
        cast.map((person, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Person', person)}
              style={styles.castItem}
            >
              <View style={styles.imageContainerStyles}>
                <Image
                  style={styles.imageStyles}
                  source={{
                    uri: image185(person?.profile_path) || fallbackPersonImage,
                  }}
                />
              </View>
              <Text style={styles.characterText}>
                {person?.character.length > 10
                  ? person.character.slice(0, 10) + '...'
                  : person?.character}
              </Text>
              <Text style={styles.nameText}>
                {person?.original_name.length > 10
                  ? person.original_name.slice(0, 10) + '...'
                  : person?.original_name}
              </Text>
            </TouchableOpacity>
          );
        })}
    </ScrollView>
  </View>
  );
}

const styles = StyleSheet.create({
  imageContainerStyles: {
    overflow: "hidden",
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
  },
  imageStyles: {
    borderRadius: 50,
    borderColor: "#fff",
    height: 100,
    width: 100
  },
  container: {
    marginVertical: 24,
  },
  title: {
    color: 'white',
    fontSize: 18,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 15,
  },
  castItem: {
    marginRight: 16,
    alignItems: 'center',
  },
  characterText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
  nameText: {
    color: 'gray', // You can adjust the color as needed
    fontSize: 12,
  },
});
