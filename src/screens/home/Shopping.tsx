import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import MyPaginatedCarousel from '../../components/MyPaginatedCarousel'
import MyShoppingCarousel from '../../components/MyShoppingCarousel'
import ShoppingPhones from './ShoppingPhones'
import Phones from './Phones'
import AndroidPhones from './AndroidPhones'
import ApplePhones from './ApplePhones'
import { useTranslation } from 'react-i18next'
import expoLanguageDetector from '../../../plugins/expoLanguageDetector'
import { addResources } from '../../../i18n'
import { en, tr } from '../../../locales'

const Shopping = () => {
  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();

  useEffect(() => {
   if(language == "en") {
    addResources(en);
   }
   else {
    addResources(tr);
   }
  }, []);

  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.container}>

      <MyPaginatedCarousel />
      
      <MyShoppingCarousel/>

      <View>
        <ShoppingPhones
          titleText={t("phoneopportunity")}
          firstTabName={'Phones'}
          secondTabName={'AndroidPhones'}
          thirdTabName={'ApplePhones'}
          firstTabLabel={t("mobilephones")}
          secondTabLabel={t("androidphones")}
          thirdTabLabel={t("appleiosphones")}
          firstTabComponent={Phones}
          secondTabComponent={AndroidPhones}
          thirdTabComponent={ApplePhones}
        />
      </View>
      

    </ScrollView>
  )
}

export default Shopping

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  }
})