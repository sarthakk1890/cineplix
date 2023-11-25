import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MovieCard from '../../Components/MovieCard';
import Carousel from 'react-native-snap-carousel';
import { themeColors } from '../../theme';

const { width } = Dimensions.get('window');

const NewScreen: React.FC = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({ item }) => (
    <MovieCard item={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Featured Movies</Text>
      <Carousel
        containerCustomStyle={{ overflow: 'visible' }}
        data={data}
        renderItem={renderItem}
        firstItem={1}
        loop
        inactiveSlideScale={0.75}
        inactiveSlideOpacity={0.75}
        sliderWidth={width}
        itemWidth={width * 0.63}
        slideStyle={{ display: 'flex', alignItems: 'center', marginTop:40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#010917',
    paddingTop: 30,
  },
  heading: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
  },
});

export default NewScreen;
