import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native'; // Import Linking
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const MovieDetailScreen = ({ route }) => {
  const { show } = route.params;
  const navigate = useNavigation();

  const handlePress = () => {
    if (show.officialSite) {
      Linking.openURL(show.officialSite);
    } else {
      // Show a pop-up message when the link is undefined
      Alert.alert('Link is not defined', 'The official site link is not available.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: show.image?.original || "https://imgs.search.brave.com/K3qeJtm_up-upl3RLJWUvn5gAAdCoNqMoXs5Gox95xU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVibGljZG9tYWlu/cGljdHVyZXMubmV0/L3BpY3R1cmVzLzI4/MDAwMC92ZWxrYS9u/b3QtZm91bmQtaW1h/Z2UtMTUzODM4NjQ3/ODdsdS5qcGc" }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.arrowContainer} onPress={() => navigate.pop()}>
          <ArrowLeftIcon size={30} color='white' />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{show.name}</Text>
        <Text style={styles.subtitle}>Genres: {show.genres.join(', ')}</Text>
        <Text style={styles.subtitle}>Type: {show.type}</Text>
        <Text style={styles.subtitle}>Language: {show.language}</Text>
        <Text style={styles.subtitle}>Status: {show.status}</Text>
        <Text style={styles.subtitle}>Premiered: {show.premiered}</Text>
        <Text style={styles.subtitle}>Average Runtime: {show.averageRuntime} minutes</Text>
        <Text style={styles.description}>
          {show.summary ? show.summary.replace(/<[^>]*>/g, '') : "No description Available"}
        </Text>

        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.link}>Official Site</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010917',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
  },
  arrowContainer: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'transparent', // Transparent background
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'lightgrey',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 16,
  },
  link: {
    color: 'blue',
    fontSize: 16,
    marginBottom: 16,
  },
});

export default MovieDetailScreen;
