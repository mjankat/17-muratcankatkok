import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'

const Banner = ({ imageUrl, url }) => {
  const handleBannerPress = () => {
    Linking.openURL(url)
      .catch((err) => console.error("Bağlantı açılamadı: " + err));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleBannerPress}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
    </TouchableOpacity>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginVertical: 10,
  },
  image: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    height: 120,
  },
});