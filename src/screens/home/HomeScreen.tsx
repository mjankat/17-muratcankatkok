import React, { useEffect, useState } from 'react'
import { Dimensions, View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import MyCard from '../../components/MyCard'
import MyCarousel from '../../components/MyCarousel'
import Banner from '../../components/Banner'
import MySearchBarButton from '../../components/MySearchBarButton'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getCampaigns, selectCampaigns } from '../../slices/campaignsSlice'
import { getBanner, selectBanners } from '../../slices/bannersSlice'
import expoLanguageDetector from '../../../plugins/expoLanguageDetector'
import { en, tr } from "../../../locales";
import { useTranslation } from 'react-i18next'
import { addResources } from '../../../i18n'
import { FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
 const navigation = useNavigation();

 const campaigns = useSelector(selectCampaigns);
 const banners = useSelector(selectBanners);
 const dispatch = useDispatch();

 const language = expoLanguageDetector.detect();

 const { t } = useTranslation();

 useEffect(() => {
  //@ts-ignore
  dispatch(getCampaigns())
  //@ts-ignore
  dispatch(getBanner())

  if(language == "en") {
    addResources(en);
   }
   else {
    addResources(tr);
   }
 }, []);

 const navigateToSearchScreen = () => {
  //@ts-ignore
  navigation.navigate('SearchScreen');
 };

 const navigateToCampaignsScreen = () => {
  //@ts-ignore
  navigation.navigate('SearchScreen', {
    screen: 'Campaigns',
  });
};


 return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <TouchableOpacity style={styles.searchBar} onPress={navigateToSearchScreen}>
        <MySearchBarButton searchBarTitle={t("searchbar.title")}/>
      </TouchableOpacity>
      <MyCarousel />
      <Text style={styles.middleText}>{t("home.title")}</Text>
      <View style= {styles.cardDirection}>
      {campaigns.slice(0, 6).map((card, index) => (
          <React.Fragment key={card.id}>
            <MyCard
              url={card.image}
              description={ language == "en" ? card.titleEN : card.title}
              chance={ language == "en" ? card.subtitleEN : card.subtitle}
            />
            <View key={card.id}>
              {((index === 3 && banners[1]) || (index === 5 && banners[0])) && (
                <Banner imageUrl={banners[index === 3 ? 1 : 0].image} url={banners[index === 3 ? 1 : 0].url} />
              )}
            </View>
          </React.Fragment>
        ))}

      <TouchableOpacity 
      onPress={navigateToCampaignsScreen}
      style={styles.ImageContainer}>
        <View style={styles.more}>
          <Text>{t("home.more.button")}</Text>
          <FontAwesome5 name="angle-right" size={18} color="black" />
        </View>
        </TouchableOpacity>
      </View>
    </ScrollView>

 )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: Dimensions.get('window').width,
    height: 150,
    borderWidth: 1,
    borderColor: 'gray',
  },
  searchBar: {
      justifyContent: "center", 
      alignItems: "center", 
      marginVertical: 10,
  },
  middleText: {
    marginLeft: '3%',
    fontWeight: 'bold',
    fontSize: 18
  },
  cardDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  more:{
    width: Dimensions.get('window').width*0.5,
    justifyContent:"space-evenly",
    alignItems:"center",
    marginTop: '10%',
    backgroundColor: '#E6E6E6',
    borderRadius: 15,
    padding: 13,
    flexDirection: 'row', 
  },
  ImageContainer:{
    alignItems:'center',
    marginLeft:'25%'
  }
})

export default HomeScreen