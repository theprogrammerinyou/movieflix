import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[]);

  const getTrendingMovies = async ()=>{
    try {
      const data = await fetchTrendingMovies();
      console.log('got trending', data.results.length)
      if (data && data.results) setTrending(data.results);
      setLoading(false)
    } catch(error) {
      console.error('error getting trending movies: ',error);
      setLoading(false)
    }
  }
  const getUpcomingMovies = async ()=>{
    try {
      const data = await fetchUpcomingMovies();
      console.log('got upcoming', data.results.length)
      if(data && data.results) setUpcoming(data.results);
    } catch(error) {
      console.error("error getting upcoming movies:", error);
      setLoading(false)
    }

  }
  const getTopRatedMovies = async ()=>{
    try {
      const data = await fetchTopRatedMovies();
      console.log('got top rated', data.results.length)
      if(data && data.results) setTopRated(data.results);
    } catch(error) {
      console.error("error getting top rated movies:", error);
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* search bar */}
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="auto" />
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="black" />
          <Text style={styles.textStyles}>
              Movies
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
          >
            {/* Trending Movies Carousel */}
            { trending.length>0 && <TrendingMovies data={trending} /> }
            {/* upcoming movies row */}
            { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }
            {/* top-rated movies row */}
            { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }
          </ScrollView>
        )
      }
  </View>
  )
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
  }
})
