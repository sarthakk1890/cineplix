import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { themeColors } from '../theme';

const MovieCard = ({ item }) => {
  const imageUrl = item.show.image?.medium || "https://imgs.search.brave.com/K3qeJtm_up-upl3RLJWUvn5gAAdCoNqMoXs5Gox95xU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/cHVibGljZG9tYWlu/cGljdHVyZXMubmV0/L3BpY3R1cmVzLzI4/MDAwMC92ZWxrYS9u/b3QtZm91bmQtaW1h/Z2UtMTUzODM4NjQ3/ODdsdS5qcGc";
  const title = item.show.name;
  const summary = item.show.summary;
  const navigate = useNavigation();

  const maxDescriptionLength = 300;
  const truncatedDescription =
    summary && summary.length > maxDescriptionLength
      ? `${summary.substring(0, maxDescriptionLength)}...`
      : summary;

  return (
    <TouchableOpacity onPress={() => { navigate.push('Detail', { ...item }) }}>
      <View style={styles.cardContainer}>

        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.summary}>
            {truncatedDescription ? truncatedDescription.replace(/<[^>]*>/g, '') : "No description Available"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#000',
    marginBottom: 16,
    height: 500,
    width: 250,
    margin: 5,
  },
  image: {
    width: 'auto',
    height: '50%',
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    margin: 10,
    
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: themeColors.bgLight,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#fff',
  },
});

export default MovieCard;
