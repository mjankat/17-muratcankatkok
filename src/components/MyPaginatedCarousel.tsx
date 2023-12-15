import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { getMyPaginatedCarousels, selectMyPaginatedCarousels } from '../slices/myPaginatedCarouselSlice';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MyPaginatedCarousel = () => {
    
    const myPaginatedCarousels = useSelector(selectMyPaginatedCarousels);
    const dispatch = useDispatch();

    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);

    const language = expoLanguageDetector.detect();

    const { t } = useTranslation();

    useEffect(() => {
      //@ts-ignore
        dispatch(getMyPaginatedCarousels())

        if(language == "en") {
          addResources(en);
         }
         else {
          addResources(tr);
         }
    }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.carouselItem, { height: screenHeight * 0.87 }]}>
      <Image style={styles.carouselImage} source={{ uri: item.url }} />
      <View style={styles.texts}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{ language == "en" ? item.descriptionEN : item.description}</Text>
        <View style={styles.textBorder}></View>
        {
          (item.price === 'Daha Fazla Gör >' || item.price === 'See More >') && language === 'en' ? (
            <TouchableOpacity>
              <Text style={styles.priceButton}>{item.priceEN}</Text>
            </TouchableOpacity>
          ) : (item.price === 'Daha Fazla Gör >' || item.price === 'Daha Fazla Gör >') && language === 'tr' ? (
            <TouchableOpacity>
              <Text style={styles.priceButton}>{item.priceEN}</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.priceText}>{item.price} ₺</Text>
          )
        }

      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={myPaginatedCarousels}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        layout={'tinder'}
        onSnapToItem={(index) => setActiveIndex(index)}
        loop={true}
        autoplay={true}
        autoplayInterval={4000}
        ref={carouselRef}
      />
      <Pagination
        dotsLength={myPaginatedCarousels.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.pagination}
        dotStyle={styles.dot}
        inactiveDotStyle={styles.inactiveDot}
      />
    </View>
    
  );
};

export default MyPaginatedCarousel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textBorder: {
    borderWidth: 0.2, 
    width: '100%',
    borderColor: '#C1C1C1',
    backgroundColor: '#C1C1C1',
    marginVertical: 12
  },
  carouselItem: {
    width: screenWidth,
    backgroundColor: '#ffffff',
  },
  carouselImage: {
    width: screenWidth,
    height: screenHeight * 0.67,
    resizeMode:'stretch'
  },
  pagination: {
    position: 'absolute',
    top: 520,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  texts: {
    marginHorizontal: '5%',
    marginVertical: '3%'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  priceButton:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  priceText:{
    fontSize: 20,
    fontWeight: 'bold'
  }
});
