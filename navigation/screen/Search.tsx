import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { MagnifyingGlassIcon as SearchSolid } from 'react-native-heroicons/solid';
import { themeColors } from '../../theme';
import MovieCard from '../../Components/MovieCard';

const SearchScreen: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchText) {
      fetchSearchResults();
    } else {
      fetchData();
    }
  }, [searchText]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchText}`);
      const result = await response.json();
      setSearchResults(result);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#a0a0a0"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <SearchSolid size={30} color={themeColors.bgLight} />
        </TouchableOpacity>
      </View>

      {searchResults.length === 0 ? (
        <Text style={styles.noMovieText}>No movie to show</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item?.show?.id.toString()}
          renderItem={({ item }) => (
            <MovieCard item={item} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: themeColors.subColor,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: 20,
    borderColor: themeColors.bgLight,
    borderWidth: 0.4,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 35,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: 'white',
  },
  searchIcon: {
    padding: 10,
  },
  flatListContainer: {
    marginTop: 20,
  },
  noMovieText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SearchScreen;
