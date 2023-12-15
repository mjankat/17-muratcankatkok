import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getMyShoppingCarousel, selectMyShoppingCarousels } from '../slices/myShoppingCarouselSlice';
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';

const {width: screenWidth} = Dimensions.get('window');

const MyShoppingCarousel = () => {

  const images = useSelector(selectMyShoppingCarousels);

  const dispatch = useDispatch();

  const carouselRef = useRef(null);

  const language = expoLanguageDetector.detect();

    const { t } = useTranslation();

    useEffect(() => {
      //@ts-ignore
     dispatch(getMyShoppingCarousel())

     if(language == "en") {
      addResources(en);
     }
     else {
      addResources(tr);
     }
    }, []);
  
    const renderItem = ({item, index}, parallaxProps) => {
      return (
        <View style={styles.item}>
            <Text style={styles.title}>{language == "en" ? item.titleEN : item.title}</Text>
          <ParallaxImage
            source={{uri: item.url}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
      );
    };
  
    return (
      <>
      <View>
        <Carousel
          ref={carouselRef}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 60}
          data={images}
          renderItem={renderItem}
          hasParallaxImages={true}
          firstItem={2}
          autoplay={true} 
          autoplayInterval={4000}
          loop={true}
        />
      </View>
      </>
    );
}

export default MyShoppingCarousel

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 50,
        backgroundColor: '#ffffff',
      },
      item: {
        width: screenWidth - 60,
        height: screenWidth - 160,
      },
      imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ios: 0, android: 1}),
        backgroundColor: 'white',
        borderRadius: 8,
      },
      image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'contain',
      },
      title:{
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
      }
})