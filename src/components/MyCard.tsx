import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const MyCard = ({description, url, chance}) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const handleFavIconPress = () => {
        setIsFavorite(!isFavorite)
 }
  return (
    <TouchableOpacity style={styles.card}>
      <Image
        style={styles.image}
        source={{ uri: url }}
      />
        <TouchableOpacity style={styles.favIcon} onPress={handleFavIconPress}>
            <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={23} color={isFavorite ? "#e81f89" : "white"} />
          </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.description}>
          {description}
        </Text>
        <Text style={styles.description}>
          {chance}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default MyCard

const styles = StyleSheet.create({
  card: {
    width: '45%',
    height: 'auto',
    marginVertical: 10,
    marginHorizontal: '2.5%',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 },
 image: {
    width: '100%',
    height: 200,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    
 },
 content: {
    padding: 10,
 },
 header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
 },
 logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'lightgray',
 },
 favIcon: {
    padding: 5,
    borderRadius: 50,
    position: "absolute",
    top: 1,
    right: 4
 },
 description: {
    fontSize: 14,
    color: '#333',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 5,
    fontWeight: 'bold'
 },
})