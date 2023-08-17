import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Movie, MovieCard } from './src/components/MovieCard';
import { SearchBar } from './src/components/SearchBar';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';
import { setMovies } from './src/redux/moviesListSlice';
import { MovieDetailsView } from './src/components/MovieDetailView';

export const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmU2ZTdjZWQ4NWQ1YjM5YmI0MTZhMDUzYjQ5YmY0YyIsInN1YiI6IjY0ZGMzYjZmZmUwNzdhMDExZTM2NjUwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1Xur44nMT-ADvC-FKGby0FxO4dlfdUkt_ZpOpaKv-EE';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [selectedItem, setSelectedItem] = useState<Movie>({
    id: 0,
    title: '',
    poster_path: '',
    vote_average: 0,
    overview: '',
    release_date: ''
  });
  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const result = useAppSelector((state) => state.moviesList.data);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => dispatch(setMovies(response.results)))
      .catch(err => dispatch(setMovies([])));
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainerStyle as ViewStyle, { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <SearchBar onGetInitialData={getData} />
      <FlatList
        numColumns={2}
        data={result}
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'flex-start' }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <MovieCard 
        onItemPress={() => {
          setSelectedItem(item)
            setVisible(true)
        }} 
        item={item} 
        />}
        keyExtractor={item => item.id.toString()}
      />
      <MovieDetailsView visible={visible} onHide={() => setVisible(false)} item={selectedItem} />
    </SafeAreaView>
  );
}

const RootApp = () => {
  return <Provider store={store}>
    <App />
  </Provider>
}

const styles = StyleSheet.create({
  safeAreaContainerStyle: {
    flex: 1,
    alignItems: 'center',
  },
});

export default RootApp;
