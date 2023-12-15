import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyShoppingCard from '../../components/MyShoppingCard';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAndroidPhone, selectAndroidPhones } from '../../slices/androidPhones';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../../i18n';
import { en, tr } from '../../../locales';

const AndroidPhones = () => {

  const androidPhones = useSelector(selectAndroidPhones)
  const dispatch = useDispatch();
  
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth * androidPhones.length;

  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();

   useEffect(() => {
    //@ts-ignore
    dispatch(getAndroidPhone())

    if(language == "en") {
      addResources(en);
     }
     else {
      addResources(tr);
     }
  }, []);

  const renderCard = ({ item }) => {
    return (
      <MyShoppingCard
        key={item.id}
        description={language == "en" ? item.descriptionEN : item.description}
        url={item.url}
        price={item.price}
        type={item.type}
        title={item.title}
        denemeWidth={screenWidth}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={androidPhones}
          horizontal={true}
          renderItem={renderCard}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: itemWidth * 0.44}}
        />
      </View>
    </View>
  );
};

export default AndroidPhones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
