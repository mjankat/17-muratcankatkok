import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const maxLength = 22;

const ProductCards = (props) => {
const [isFavorite, setIsFavorite] = useState(false);

  const handleFavIconPress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <TouchableOpacity style={styles.card}>
      <Image style={styles.image} source={{ uri: props.image }} resizeMode="contain" />
      <TouchableOpacity style={styles.favIcon} onPress={handleFavIconPress}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={windowWidth * 0.05}
          color={isFavorite ? '#e81f89' : '#C1C1C1'}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.description}>
            {props.subtitle.length > maxLength
                ? `${props.subtitle.substring(0, maxLength)}...`
                : props.subtitle}
        </Text>
        <View style={styles.priceContainer}>
            {props.oldPrice && props.oldPrice !== '' && (
             <View style={styles.discountedPrice}>
                <Text style={styles.oldPrice}>{props.oldPrice} ₺</Text>
                <Text style={styles.discount}>{props.discount}</Text>
             </View>
            )}
            <View style={styles.newPrice}>
                <Text style={styles.price}>{props.price} ₺</Text>
            </View>
            
        </View>
        
      </View>
      <TouchableOpacity style={styles.plusIcon}>
        <AntDesign name="pluscircle" size={windowWidth * 0.06} color="#e81f89" />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default ProductCards

const styles = StyleSheet.create({
    card: {
        width: windowWidth * 0.43,
        height: windowWidth * 0.6,
        marginHorizontal: '1.3%',
        marginVertical: '4%',
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
        position: 'relative',
      },
      image: {
        width: '100%',
        height: '60%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
      },
      content: {
        paddingHorizontal: windowWidth * 0.02,
      },
      titleText: {
        fontSize: windowWidth * 0.04,
        color: '#333',
        fontWeight: 'bold',
        bottom: windowWidth * 0.06  ,
      },
      description: {
        fontSize: windowWidth * 0.03,
        color: '#333',
        fontWeight: 'bold',
      },
      priceContainer: {
        alignItems: 'left',
        marginTop: '6%'
      },
      price: {
        fontSize: windowWidth * 0.038,
        color: '#333',
        fontWeight: 'bold',
      },
      favIcon: {
        padding: windowWidth * 0.02,
        borderRadius: 50,
        position: 'absolute',
        top: windowWidth * 0.01,
        right: windowWidth * -0.01,
      },
      plusIcon: {
        position: 'absolute',
        bottom: windowWidth * 0.03,
        right: windowWidth * 0.02,
      },
      discountedPrice: {
        flexDirection: 'row',
        gap: 8
      },
      discount: {
        backgroundColor:'lightgray',
        paddingHorizontal: 8,
        borderRadius: 8
      },
      oldPrice: {
        textDecorationLine: 'line-through',
        color: 'darkgray',
        marginLeft: '2%'
      },
      newPrice: {
        
      }
      
})